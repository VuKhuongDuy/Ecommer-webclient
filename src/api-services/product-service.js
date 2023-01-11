import axiosInstance from "./axios-instance"

export const productService = {
  get: async (q = '', limit = 1000, offset = 1, categoryId) => {
    console.log('fetch product data')
    return axiosInstance.get(`/product?q=${q}&limit=${limit}&offset=${offset}&category=${categoryId}`);
  },

  getRelatedProducts: async (categoryId) => {
    console.log('fetch related product')
    return axiosInstance.get(`/product?limit=4&offset=1&category=${categoryId}`);
  },

  getBySlug: async(slug) => {
    return axiosInstance.get(`/product/slug/${slug}`);
  },

  getNew: async() => {
    return axiosInstance.get(`/product/new`);
  },
  
  getFeatured: async() => {
    return axiosInstance.get(`/product/featured`);
  },

  getBestSeller: async() => {
    return axiosInstance.get(`/product/best_seller`);
  },

  getFlashSale: async() => {
    return axiosInstance.get(`/product/flash_sale`);
  },

  getDealOfTheDay: async() => {
    return axiosInstance.get(`/product/deal_of_the_day`);
  },

  getCarousel: async() => {
    return axiosInstance.get(`/product/carousel`);
  },
}
