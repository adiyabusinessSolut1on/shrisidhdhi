import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { login, logout, verifyLogin } from "./api/admin";
import {
  createCategory,
  deleteCategory,
  updateCategory,
} from "./api/categoryApi";
import { deleteReview, verifyReview } from "./api/review";
import { createBanner, deleteBanner, updateBanner } from "./api/banner";
import { BannerPostType } from "./types";
import { createProduct, deleteProduct, updateProduct } from "./api/product";

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
//creat Product
// export const useCreatProduct = () => {
//   return useMutation({
//     mutationFn: (banner: { title: string; image: string; url: string }) =>
//       createProduct(banner),
//   });
// };

// //update product
// export const useUpdateProduct = () => {
//   return useMutation({
//     mutationFn: (payload: { id: string; banner: BannerPostType }) =>
//       updateProduct(payload.id, payload.banner),
//   });
// };

//delete
export const useDeleteProduct = () => {
  return useMutation({
    mutationFn: (id: string) => deleteProduct(id),
  });
};
