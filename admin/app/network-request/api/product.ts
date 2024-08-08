import axios from "../axios";
import {
  DeletResponseType,
  ProductGetType,
  ProductPostType,
  ProductResponseType,
} from "../types";

export const getProducts = (): Promise<ProductGetType[]> =>
  axios
    .get<ProductGetType[]>("/product")
    .then((response) => {
      console.log(response, "ProductApi, get");
      return response.data;
    })
    .catch((error) => {
      console.log(error.message, error);
      throw error;
    });
export const getSingleProduct = (id: string): Promise<ProductGetType> =>
  axios
    .get<ProductGetType>(`/product/${id}`)
    .then((response) => {
      console.log(response, "ProductApi, get");
      return response.data;
    })
    .catch((error) => {
      console.log(error.message, error);
      throw error;
    });

export const createProduct = (
  product: ProductPostType
): Promise<ProductResponseType> =>
  axios
    .post<ProductResponseType>("/product/create", product)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });

export const updateProduct = (
  id: string,
  product: ProductPostType
): Promise<ProductResponseType> =>
  axios
    .put<ProductResponseType>(`/product/${id}`, product)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });

export const draftProduct = (
  id: string,
  isDraft: boolean
): Promise<DeletResponseType> =>
  axios
    .put<DeletResponseType>(`/product/draft/${id}`, { isDraft })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });

export const deleteProduct = (id: string): Promise<DeletResponseType> =>
  axios
    .delete<DeletResponseType>(`/product/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
