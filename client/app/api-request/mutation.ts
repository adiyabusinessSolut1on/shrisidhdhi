import { useMutation } from "@tanstack/react-query";
import { CreateREVIEW } from "./api/review";
import { ResviewPostType } from "./types";


export const useCreatProduct = () => {
    return useMutation({
      mutationFn: (review: ResviewPostType) => CreateREVIEW(review),
    });
  };