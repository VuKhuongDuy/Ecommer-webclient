import axiosInstance from "./axios-instance"

export const categoryService = {
  get: async (search = '', limit = 10, offset = 1) => {
    console.log('fetch category data: ', `/category?q=${search}&limit=${limit}&offset=${offset}`)
    const data = await axiosInstance.get(`/category?q=${search}&limit=${limit}&offset=${offset}`);
    return data.data;
  },
  getBySlug : async (slug = '') => {
    const data = await axiosInstance.get(`/category/${slug}`);
    return data
  }
}
