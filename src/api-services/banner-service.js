import axiosInstance from "./axios-instance"
const transformMediaUrl = (data) => {
  if(data) {
    data.image = process.env.NEXT_PUBLIC_MINIO_MEDIA_HOST + data.image
    return data
  }
  return null;
}

export const bannerService = {
  
  getHomeBanner: async () => {
    const data = await axiosInstance.get(`/banner/homeBanner`);
    return transformMediaUrl(data.data);
  },

  getHomeCenter: async () => {
    const data = await axiosInstance.get(`/banner/homeCenter`);
    return transformMediaUrl(data.data);
  },

  getBannerSlide: async () => {
    const data = await axiosInstance.get(`/banner/homeSlide`);
    return data.data.map(d => transformMediaUrl(d));
  },

  getBannerProductSidebar: async () => {
    const data = await axiosInstance.get(`/banner/productSidebarBanner`);
    return transformMediaUrl(data.data);
  }
}
