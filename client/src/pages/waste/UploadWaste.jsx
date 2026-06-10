import { useState } from "react";
import UserLayout from "../../layouts/UserLayout";
import { useRef } from "react";
import {
  uploadWaste,
  detectWaste,
  uploadImage,
} from "../../services/wasteService";
import * as tmImage from "@teachablemachine/image";

const UploadWaste = () => {
  const [image, setImage] = useState(null);

  const [preview, setPreview] = useState("");

  const [weight, setWeight] = useState("");
  const [detectedType, setDetectedType] = useState("");

  const [wasteType, setWasteType] = useState("Plastic");
  const cameraInputRef = useRef(null);
  const galleryInputRef = useRef(null);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setImage(file);

    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);

    try {
      const modelURL =
        "https://teachablemachine.withgoogle.com/models/YsA-u3YP3/model.json";

      const metadataURL =
        "https://teachablemachine.withgoogle.com/models/YsA-u3YP3/metadata.json";

      const model = await tmImage.load(modelURL, metadataURL);

      const img = new Image();
      img.src = previewUrl;

      img.onload = async () => {
        const predictions = await model.predict(img);

        const best = predictions.sort(
          (a, b) => b.probability - a.probability,
        )[0];

        setDetectedType(best.className);
        setWasteType(best.className);
      };
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      return alert("Please select image");
    }

    if (!weight) {
      return alert("Please enter weight");
    }

    try {
      // Upload file first
      const imageResponse = await uploadImage(image);

      // Save waste
      const response = await uploadWaste({
        image: imageResponse.image,
        weight: Number(weight),
        wasteType,
      });

      localStorage.setItem("user", JSON.stringify(response.updatedUser));

      alert("Waste uploaded successfully");

      window.location.href = "/dashboard";
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <UserLayout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Upload Waste</h1>

          <p className="text-gray-500 mt-2">
            Upload your recyclable waste and earn points.
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-sm p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Image */}
            <div>
              <label className="block font-medium mb-3">Waste Image</label>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => cameraInputRef.current.click()}
                  className="flex-1 bg-green-700 text-white py-3 rounded-xl"
                >
                  📷 Open Camera
                </button>

                <button
                  type="button"
                  onClick={() => galleryInputRef.current.click()}
                  className="flex-1 bg-blue-600 text-white py-3 rounded-xl"
                >
                  🖼️ Choose Gallery
                </button>
              </div>

              {/* Camera */}
              <input
                ref={cameraInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleImageChange}
                className="hidden"
              />

              {/* Gallery */}
              <input
                ref={galleryInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />

              {preview && (
                <img
                  src={preview}
                  alt="preview"
                  className="mt-4 h-56 w-full object-cover rounded-xl"
                />
              )}
            </div>

            {/* Weight */}
            <div>
              <label className="block font-medium mb-3">Weight (KG)</label>

              <input
                type="number"
                step="0.1"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="Enter weight"
                className="w-full border rounded-xl p-3"
              />
            </div>

            {/* Waste Type */}
            

            {/* AI Box */}
            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <h3 className="font-semibold text-green-700">🤖 AI Detection</h3>

              <p className="mt-2">
                Detected Type:
                <span className="font-bold ml-2">
                  {detectedType || "Waiting..."}
                </span>
              </p>
            </div>

            <button
              type="submit"
              className="w-full bg-green-700 hover:bg-green-800 text-white py-3 rounded-xl font-semibold"
            >
              Submit Waste
            </button>
          </form>
        </div>
      </div>
    </UserLayout>
  );
};

export default UploadWaste;
