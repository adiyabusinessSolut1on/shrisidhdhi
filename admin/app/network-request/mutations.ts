import { useMutation, UseMutationResult } from '@tanstack/react-query';
import {login, logout, verifyLogin} from "./api/admin";

export const useLogin = () => {
    return useMutation({
      mutationFn: (payload: { email: string; password: string }) => 
        login(payload.email, payload.password)
    });
  };

  export const useLoginverify = () => {
    return useMutation({
      mutationFn: (payload: { email: string; otp: number }) => 
        verifyLogin(payload.email, payload.otp)
    });
  };

  export const useLogout = () => {
    return useMutation({
      mutationFn: () => 
        logout()
    });
  };