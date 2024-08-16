import axios from "../axios";
import { ProductGetType } from "../types";
export const getProducts = (): Promise<ProductGetType[]> =>
  axios
    .get<ProductGetType[]>("/product")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error.message, error);
      throw error;
    });
export const getSingleProduct = (slug: string): Promise<ProductGetType> =>
  axios
    .get<ProductGetType>(`/product/single/${slug}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error.message, error);
      throw error;
    });

  