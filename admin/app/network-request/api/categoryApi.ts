import axios from "../axios";
import {
  CategoryDeletResponseType,
  CategoryGetTypes,
  CategoryPostTypes,
  CategoryResponseType,
} from "../types";

export const getCategories = (): Promise<CategoryGetTypes[]> =>
  axios
    .get<CategoryGetTypes[]>("/category")
    .then((response) => {
      console.log(response, "Categoryapi, get");
      return response.data;
    })
    .catch((error) => {
      console.log(error.message, error);
      throw error;
    });

export const createCategory = (
  category: CategoryPostTypes
): Promise<CategoryResponseType> =>
  axios
    .post<CategoryResponseType>("/category/create", category)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });

export const updateCategory = (
  id: string,
  category: CategoryPostTypes
): Promise<CategoryResponseType> =>
  axios
    .put<CategoryResponseType>(`/category/update/${id}`, category)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });

export const deleteCategory = (
  id: string
): Promise<CategoryDeletResponseType> =>
  axios
    .delete<CategoryDeletResponseType>(`/category/delete/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
