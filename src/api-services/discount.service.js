import axiosInstance from "./axios-instance"

export const discountService = {
    getVoucher: async (voucherCode) => {
      return axiosInstance.get(`/discount/${voucherCode}`);
    },
}