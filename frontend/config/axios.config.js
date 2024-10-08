import axios from "../node_modules/axios/dist/esm/axios.js";

export const axiosCustom = axios.create({
  baseURL: "http://localhost:3000/api/v1",
  timeout: 1000,
});
