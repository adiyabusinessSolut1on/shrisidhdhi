import {
  CategoryPostTypes,
  CategoryResponseType,
} from "@/app/pages/category/page";
import axios from "../axios";

export const getCategories = (): Promise<any> =>
  axios
    .get<any>("/category")
    .then((response) => {
      console.log(response, "catgoery");
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
    .then((response) => {
      console.log(response, "categoryApi");
      return response.data;
    })
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

export const deleteCategory = (id: string): Promise<any> =>
  axios
    .delete(`/category/delete/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
