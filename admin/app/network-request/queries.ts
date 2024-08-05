import { useInfiniteQuery, useQuery  } from "@tanstack/react-query";
import { getMyself } from "./api/admin";

export const useGetMyself = () =>
    useQuery<IUser, Error>({
      queryKey: ["myself"],
      queryFn: getMyself,
    });