import axiosInstance from "./axios-instance"

export const postService = {
  getSlidePost: async () => {
    const data = await axiosInstance.get(`/post?limit=3&page=1`);
    return data.data;
  }
}
