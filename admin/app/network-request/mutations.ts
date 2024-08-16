import { useMutation } from "@tanstack/react-query";
import { login, logout, verifyLogin } from "./api/admin";
import {
  createCategory,
  deleteCategory,
  updateCategory,
} from "./api/categoryApi";
import { deleteReview, verifyReview } from "./api/review";
import { createBanner, deleteBanner, updateBanner } from "./api/banner";

import {
  createProduct,
  deleteProduct,
  draftProduct,
  updateProduct,
} from "./api/product";
import { BannerPostType, BlogPostType, ProductPostType } from "./types";
import { createBlog, deleteBlog, updateBlog } from "./api/blog";

export const useLogin = () => {
  return useMutation({
    mutationFn: (payload: { email: string; password: string }) =>
      login(payload.email, payload.password),
  });
};

export const useLoginverify = () => {
  return useMutation({
    mutationFn: (payload: { email: string; otp: number }) =>
      verifyLogin(payload.email, payload.otp),
  });
};

export const useLogout = () => {
  return useMutation({
    mutationFn: () => logout(),
  });
};

///Category
//Creating Category
export const useCreateCategory = () => {
  return useMutation({
    mutationFn: (category: { name: string }) => createCategory(category),
  });
};

//Updating Category
export const useUpdateCategory = () => {
  return useMutation({
    mutationFn: (payload: { id: string; category: { name: string } }) =>
      updateCategory(payload.id, payload.category),
  });
};

//Deleting Category
export const useDeleteCategory = () => {
  return useMutation({
    mutationFn: (id: string) => deleteCategory(id),
  });
};

///Review
//Verifiy review
export const useVerifyReview = () => {
  return useMutation({
    mutationFn: (payload: { id: string }) => verifyReview(payload.id),
  });
};

//Deleting review
export const useDeleteReview = () => {
  return useMutation({
    mutationFn: (id: string) => deleteReview(id),
  });
};

//Banner
//creat banner
export const useCreatBanner = () => {
  return useMutation({
    mutationFn: (banner: { title: string; image: string; url: string }) =>
      createBanner(banner),
  });
};

//update
export const useUpdateBanner = () => {
  return useMutation({
    mutationFn: (payload: { id: string; banner: BannerPostType }) =>
      updateBanner(payload.id, payload.banner),
  });
};

//delete
export const useDeleteBanner = () => {
  return useMutation({
    mutationFn: (id: string) => deleteBanner(id),
  });
};

//Product
// creat Product
export const useCreatProduct = () => {
  return useMutation({
    mutationFn: (product: ProductPostType) => createProduct(product),
  });
};

//update product
export const useUpdateProduct = () => {
  return useMutation({
    mutationFn: (payload: { id: string; product: ProductPostType }) =>
      updateProduct(payload.id, payload.product),
  });
};

//draft
export const useDraftProduct = () => {
  return useMutation({
    mutationFn: (payload: { id: string; isDraft: boolean }) =>
      draftProduct(payload.id, payload.isDraft),
  });
};

//delete
export const useDeleteProduct = () => {
  return useMutation({
    mutationFn: (id: string) => deleteProduct(id),
  });
};


//Create Blog
export const useCreatBlog = () => {
  return useMutation({
    mutationFn: (blog: BlogPostType) => createBlog(blog),
  });
};

// delkete blog
export const useDeletBlog = () => {
  return useMutation({
    mutationFn: (id: string) => deleteBlog(id),
  });
};
//Update Blog
export const useUpdateBlog = () => {
  return useMutation({
    mutationFn: (payload: { id: string; blog: BlogPostType }) =>
      updateBlog(payload.id, payload.blog),
  });
};