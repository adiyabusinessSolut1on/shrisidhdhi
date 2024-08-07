import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getMyself } from "./api/admin";
import { getCategories } from "./api/categoryApi";
import {
  BannerGetType,
  CategoryGetTypes,
  IUser,
  ProductGetType,
  ReviewsGetTypes,
} from "./types";
import { getReview } from "./api/review";
import { getBanner } from "./api/banner";
import { getProducts } from "./api/product";

export const useGetMyself = () =>
  useQuery<IUser, Error>({
    queryKey: ["myself"],
    queryFn: getMyself,
  });

//category
export const useGetCategories = () =>
  useQuery<CategoryGetTypes[], Error>({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

//Review
export const useGetReview = () =>
  useQuery<ReviewsGetTypes[], Error>({
    queryKey: ["review"],
    queryFn: getReview,
  });

//Banner
export const useGetBanner = () =>
  useQuery<BannerGetType[], Error>({
    queryKey: ["banner"],
    queryFn: getBanner,
  });

//product
export const useGetProduct = () =>
  useQuery<ProductGetType[], Error>({
    queryKey: ["product"],
    queryFn: getProducts,
  });
