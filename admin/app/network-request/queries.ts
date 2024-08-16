import { useQuery } from "@tanstack/react-query";
import {  getAllUser, getMyself } from "./api/admin";
import { getCategories } from "./api/categoryApi";
import {
  BannerGetType,
  BlogTypes,
  CategoryGetTypes,
  IUser,
  ProductGetType,
  ReviewsGetTypes,
} from "./types";
import { getReview } from "./api/review";
import { getBanner } from "./api/banner";
import { getProducts, getSingleProduct } from "./api/product";
import { getAllBlogs, getSingleBlog } from "./api/blog";

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
//product
export const useGetSinglProduct = (payload: { id: string }) =>
  useQuery<ProductGetType, Error>({
    queryKey: ["product", payload.id],
    queryFn: () => getSingleProduct(payload.id),
  });


  //All User  
  export const useGetAllUser = () =>
    useQuery<IUser, Error>({
      queryKey: ["allUser"],
      queryFn: getAllUser,
    });


//Get All Blog
export const useGetBlogs = () =>
  useQuery<BlogTypes, Error>({
    queryKey: ["blogs"],
    queryFn: getAllBlogs,
  });


//Get Single Blog By Id
export const useGetSinglBlog = (payload: { id: string }) =>
  useQuery<BlogTypes, Error>({
    queryKey: ["singleblog", payload.id],
    queryFn: () => getSingleBlog(payload.id),
  });