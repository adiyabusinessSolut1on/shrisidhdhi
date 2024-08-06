import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getMyself } from "./api/admin";
import { getCategories } from "./api/categoryApi";
import { CategoryGetTypes, IUser } from "./types";

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
