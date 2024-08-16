import axios from "../axios";
import { ResviewPostType, ReviewResponseType, ReviewsGetTypes } from "../types";
export const getReview = (productId: string): Promise<ReviewsGetTypes[]> =>
    axios
      .get<ReviewsGetTypes[]>(`/review/getall/${productId}`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error.message, error);
        throw error;
      });

      export const CreateREVIEW = (
        reviews: ResviewPostType
      ): Promise<ReviewResponseType> =>
        axios
          .post<ReviewResponseType>("/review/create", reviews)
          .then((response) => response.data)
          .catch((error) => {
            throw error;
          });
      