import { useState } from "react";

const UploadForm = ({
  onSubmit,
}) => {
  const [image, setImage] =
    useState(null);

  const [weight, setWeight] =
    useState("");

  const [wasteType, setWasteType] =
    useState("Plastic");

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      image,
      weight,
      wasteType,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-sm p-6 space-y-4"
    >
      <input
        type="file"
        onChange={(e) =>
          setImage(
            e.target.files[0]
          )
        }
        className="w-full border p-3 rounded-xl"
      />

      <input
        type="number"
        placeholder="Weight"
        value={weight}
        onChange={(e) =>
          setWeight(
            e.target.value
          )
        }
        className="w-full border p-3 rounded-xl"
      />

      <select
        value={wasteType}
        onChange={(e) =>
          setWasteType(
            e.target.value
          )
        }
        className="w-full border p-3 rounded-xl"
      >
        <option>
          Plastic
        </option>
        <option>
          Paper
        </option>
        <option>
          Glass
        </option>
        <option>
          Metal
        </option>
      </select>

      <button
        type="submit"
        className="w-full bg-green-700 text-white py-3 rounded-xl"
      >
        Upload Waste
      </button>
    </form>
  );
};

export default UploadForm;