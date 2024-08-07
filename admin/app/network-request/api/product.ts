import axios from "../axios";
import {
  CategoryDeletResponseType,
  CategoryGetTypes,
  CategoryPostTypes,
  CategoryResponseType,
  ProductGetType,
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

export const createProduct = (
  category: CategoryPostTypes
): Promise<CategoryResponseType> =>
  axios
    .post<CategoryResponseType>("/product/create", category)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });

export const updateProduct = (
  id: string,
  category: CategoryPostTypes
): Promise<CategoryResponseType> =>
  axios
    .put<CategoryResponseType>(`/product/update/${id}`, category)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });

export const deleteProduct = (id: string): Promise<CategoryDeletResponseType> =>
  axios
    .delete<CategoryDeletResponseType>(`/product/delete/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
