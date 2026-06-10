import api from "../api/axios";

export const getAllRedeems =
  async () => {
    const response =
      await api.get(
        "/admin/redeems"
      );

    return response.data;
  };

export const approveRedeem =
  async (id) => {
    const response =
      await api.put(
        `/admin/redeem/${id}/approve`
      );

    return response.data;
  };

export const rejectRedeem =
  async (id) => {
    const response =
      await api.put(
        `/admin/redeem/${id}/reject`
      );

    return response.data;
  };


  export const getAllUsers =
  async () => {
    const response =
      await api.get(
        "/admin/users"
      );

    return response.data;
  };

  export const getAllWaste =
  async () => {
    const response =
      await api.get(
        "/admin/waste"
      );

    return response.data;
  };

  export const getStats =
  async () => {
    const response =
      await api.get(
        "/admin/stats"
      );

    return response.data;
  };

  export const getAnalytics =
  async () => {
    const response =
      await api.get(
        "/admin/analytics"
      );

    return response.data;
  };