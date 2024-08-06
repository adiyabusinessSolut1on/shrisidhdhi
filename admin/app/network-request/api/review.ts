import axios from "../axios";
import {
  DeletResponseType,
  ReviewResponseType,
  ReviewsGetTypes,
} from "../types";

export const getReview = (): Promise<ReviewsGetTypes[]> =>
  axios
    .get<ReviewsGetTypes[]>("/review")
    .then((response) => {
      console.log(response, "reviewApi, get");
      return response.data;
    })
    .catch((error) => {
      console.log(error.message, error);
      throw error;
    });

export const verifyReview = (id: string): Promise<ReviewResponseType> =>
  axios
    .put<ReviewResponseType>(`/review/verify/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });

export const deleteReview = (id: string): Promise<DeletResponseType> =>
  axios
    .delete<DeletResponseType>(`/review/delete/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
