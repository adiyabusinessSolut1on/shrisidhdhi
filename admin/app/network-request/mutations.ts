import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { login, logout, verifyLogin } from "./api/admin";
import {
  createCategory,
  deleteCategory,
  updateCategory,
} from "./api/categoryApi";

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
