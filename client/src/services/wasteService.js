import api from "../api/axios";

export const uploadWaste = async (
  wasteData
) => {
  const response = await api.post(
    "/waste/upload",
    wasteData
  );

  return response.data;
};

export const getWasteHistory =
  async () => {
    const response = await api.get(
      "/waste/history"
    );

    return response.data;
  };

export const getDashboard =
  async () => {
    const response = await api.get(
      "/waste/dashboard"
    );

    return response.data;
  };

  export const uploadImage = async (
  imageFile
) => {
  const formData = new FormData();

  formData.append(
    "image",
    imageFile
  );

  const response =
    await api.post(
      "/waste/image",
      formData,
      {
        headers: {
          "Content-Type":
            "multipart/form-data",
        },
      }
    );

  return response.data;
};


  export const detectWaste =
  async (formData) => {
    const response =
      await api.post(
        "/ai/detect",
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

    return response.data;
  };