import axiosInstance from "./axios-instance"

export const categoryService = {
  get: async (search = '', limit = 10, offset = 1) => {
    console.log('fetch category data')
    const data = await axiosInstance.get(`/category?q=${search}&limit=${limit}&offset=${offset}`);
    return data;
  }
}
