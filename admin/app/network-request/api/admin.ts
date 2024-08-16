import { AxiosResponse } from "axios";
import axios from "../axios";
export const login = (email: string, password: string) => {
  return axios.post("/admin/login", { email, password });
};

export const verifyLogin = (email: string, otp: number) => {
  return axios
    .post("/admin/login/verify", { email, otp })
    .then((response) => response);
};
export const getMyself = (): Promise<any> =>
  axios
    .get<any>("/admin")
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });

export const logout = (): Promise<any> =>
  axios
    .post<any>("/admin/logout")
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });


export const getAllUser = (): Promise<any> =>
  axios
    .get<any>("/user/all")
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });

