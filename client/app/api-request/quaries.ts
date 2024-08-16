
import { useQuery } from '@tanstack/react-query';
import { BannerGetType, ProductGetType, ReviewsGetTypes } from "./types";
import { getBanner } from "./api/banner";
import { getProducts, getSingleProduct } from './api/product';
import { getReview } from './api/review';

//Banner 
export const useGetBanner = () =>
  useQuery<BannerGetType[], Error>({
    queryKey: ["banner"],
    queryFn: getBanner,
  });
//product
export const useGetProduct = () =>
  useQuery<ProductGetType[], Error>({
    queryKey: ["products"],
    queryFn: getProducts,
  });

export const useGetSinglProduct = (payload: { slug: string }) =>
  useQuery<ProductGetType, Error>({
    queryKey: ["product_single", payload.slug],
    queryFn: () => getSingleProduct(payload.slug),
  });


  //Review
  export const useGetReview = (payload: { productId: string }) =>
    useQuery<ReviewsGetTypes[], Error>({
      queryKey: ["review",payload.productId],
      queryFn:()=> getReview(payload.productId),
    });