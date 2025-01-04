import Axios from "axios";

export const api = Axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`,
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const message = error.response?.data?.message || error.message;

    switch (error.response?.status) {
      case 401:
        console.error("Unauthorized", message);
        break;
      case 403:
        console.error("Forbidden", message);
        break;
      case 404:
        console.error("Not Found", message);
        break;
      case 500:
        console.error("Internal Server Error", message);
        break;
      default:
        console.error("Error", message);
    }

    return Promise.reject(error);
  }
);
