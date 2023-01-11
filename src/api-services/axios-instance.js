import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  headers: {
    "Content-Type": "application/json"
  }
});

// axiosInstance.interceptors.request.use(
//   request => {
//     const token = localStorage.getItem("token") || "";
//     request.headers.common["ecommerce-manh"] = token;
//     return request;
//   },
//   function(error) {
//     return Promise.reject(error);
//   }
// );

axiosInstance.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
