import axios from "axios";
import store from "../redux/store";

const api = axios.create({ baseURL: "https://wallet.b.goit.study/api" });

api.interceptors.request.use((config) => {
  const { token } = store.getState().auth;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
