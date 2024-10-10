import { refresh } from "../js/requests.js";
import axios from "../node_modules/axios/dist/esm/axios.js";

export const axiosCustom = axios.create({
  baseURL: "http://localhost:3000/api/v1",
  timeout: 1000,
});

axiosCustom.defaults.headers.common[
  "Authorization"
] = `Bearer ${localStorage.getItem("token")}`;

// INTERSEPTOR
axiosCustom.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    if (error?.status == 422) {
      await refresh();
    }
    return Promise.reject(error);
  }
);
