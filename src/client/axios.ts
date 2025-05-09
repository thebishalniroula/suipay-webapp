import { baseApi } from "@/const/api";
import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: `http://${baseApi}/api/`,
  timeout: 10000,
});
