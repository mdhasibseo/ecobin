import api from "../api/axios";

export const createRedeem = async (
  redeemData
) => {
  const response =
    await api.post(
      "/redeem/create",
      redeemData
    );

  return response.data;
};

export const getRedeemHistory =
  async () => {
    const response =
      await api.get(
        "/redeem/history"
      );

    return response.data;
  };
  
  