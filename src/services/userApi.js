import axiosInstance from "./axiosInstance";

export const fetchUsersApi = async (page) => {
  const response = await axiosInstance.get("/users", {
    params: {
      _page: page,
      _limit: 5,
    },
  });

  return response.data;
};
