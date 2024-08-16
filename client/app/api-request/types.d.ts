export interface BannerGetType {
  _id: string;
  title: string;
  image: string;
  url: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductGetType {
  category: string;
  createdAt: string;
  discription: string;
  images: string[];
  isDraft: boolean;
  name: string;
  price: number;
  slug: string;
  updatedAt: string;
  _id: string;
}
export interface ResviewPostType {
  productId: string,
  name: string,
  email: string,
  message: string,
  star: number,
}
export interface ReviewsGetTypes {
  createdAt: string;
  email: string;
  message: string;
  name: string;
  productId: string;
  star: number;
  updatedAt: string;
  _id: string;
}
export interface ProductResponseType {
  success: boolean;
  message: string;
  data: ProductGetType[];
}
export interface ReviewResponseType {
  success: boolean;
  message: string;
  data: ReviewsGetTypes[];
}