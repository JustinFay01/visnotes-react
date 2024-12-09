import Axios from "axios";

export const api = Axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
});

api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const message = error.response?.data?.message || error.message;
    if (error.response?.status === 401) {
      // Redirect to login page
      console.error("Unauthorized", message);
    }

    return Promise.reject(error);
  }
);
