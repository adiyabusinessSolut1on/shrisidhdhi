import axios from "../axios";
import {
  BannerGetType,
  BannerPostType,
  BannerResponseType,
  CategoryDeletResponseType,
  CategoryGetTypes,
  CategoryPostTypes,
  CategoryResponseType,
  DeletResponseType,
} from "../types";

export const getBanner = (): Promise<BannerGetType[]> =>
  axios
    .get<BannerGetType[]>("/banner")
    .then((response) => {
      console.log(response, "Categoryapi, get");
      return response.data;
    })
    .catch((error) => {
      console.log(error.message, error);
      throw error;
    });

export const createBanner = (
  banner: BannerPostType
): Promise<BannerResponseType> =>
  axios
    .post<BannerResponseType>("/banner/create", banner)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });

export const updateBanner = (
  id: string,
  banner: BannerPostType
): Promise<BannerResponseType> =>
  axios
    .put<BannerResponseType>(`/banner/update/${id}`, banner)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });

export const deleteBanner = (id: string): Promise<DeletResponseType> =>
  axios
    .delete<DeletResponseType>(`/banner/delete/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
