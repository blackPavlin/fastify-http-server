import axios from "axios";

const client = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 5000,
});

client.interceptors.request.use((request) => {
  if (
    !!localStorage.getItem("token") &&
    !request.headers.common.Authorization
  ) {
    const token = localStorage.getItem("token");
    request.headers.Authorization = `Bearer ${token}`;
  }

  return request;
});

export default client;
