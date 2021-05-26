import axios from "axios";

const config = {
  baseURL: "http://localhost:3000",
  timeout: 5000,
};

const client = axios.create(config);

client.interceptors.request.use(
  (request) => {
    if (
      !!localStorage.getItem("token") &&
      !request.headers.common.Authorization
    ) {
      const token = localStorage.getItem("token");
      request.headers.Authorization = `Bearer ${token}`;
    }

    return request;
  },
  (error) => Promise.reject(error)
);

export default client;
