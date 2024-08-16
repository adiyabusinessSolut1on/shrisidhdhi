import axios from "../axios";
import { BlogPostType, BlogResponseType, BlogTypes, DeletResponseType } from "../types";


export const createBlog = (
  product: BlogPostType
): Promise<BlogResponseType> =>
  axios
    .post<BlogResponseType>("/blogs", product)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
export const getAllBlogs = (): Promise<any> =>
  axios
    .get<any>("/blogs")
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });

export const deleteBlog = (id: string): Promise<DeletResponseType> =>
  axios
    .delete<DeletResponseType>(`/blogs/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });

export const getSingleBlog = (id: string): Promise<BlogTypes> =>
  axios
    .get<BlogTypes>(`/blogs/getbyid/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error.message, error);
      throw error;
    });

export const updateBlog = (
  id: string,
  product: BlogPostType
): Promise<BlogResponseType> =>
  axios
    .put<BlogResponseType>(`/blogs/${id}`, product)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });