import axiosInstance from "./axios-instance"

export const bannerService = {
  getHomeBanner1: async () => {
    console.log('fetch banner data')
    const data = await axiosInstance.get(`/banner/homeBanner1`);
    return data;
  },

  getHomeBanner2: async () => {
    console.log('fetch banner data')
    const data = await axiosInstance.get(`/banner/homeBanner2`);
    return data;
  },

  getBannerSlide: async () => {
    console.log('fetch banner data')
    const data = await axiosInstance.get(`/banner/homeSlide`);
    return data;
  },

  getBannerProductSidebar: async () => {
    console.log('fetch banner data')
    const data = await axiosInstance.get(`/banner/productSidebarBanner`);
    return data;
  }
}
