interface LoginPayload {
  email: string;
  password: string;
}

interface LoginResponse {
  data: string;
  success: boolean;
}
interface IUser {
  _id: string;
  name: string;
  image: string;
  email: string;
  mobile: number;
  // phone: number;
  role: string;
  createdAt: string;
  updatedAt: string;
}

//Category
export interface CategoryGetTypes {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}
export interface CategoryPostTypes {
  name: string;
}

export interface CategoryResponseType {
  success: boolean;
  message: string;
  data: CategoryGetTypes[];
}
export interface CategoryDeletResponseType {
  success: boolean;
  message: string;
}

export interface CategoryObjectTypes {
  isCategoryForm: {
    creat: boolean;
    updateId: string;
    name: string;
  };
  closeHandler: () => void;
  refetch: () => Promise<QueryObserverResult<CategoryResponseType, Error>>;
}

//review
export interface ReviewsGetTypes {
  createdAt: string;
  email: string;
  isVerify: boolean;
  message: string;
  name: string;
  productId: string;
  star: number;
  updatedAt: string;
  _id: string;
}

export interface ReviewResponseType {
  success: boolean;
  message: string;
  data: ReviewsGetTypes[];
}

//banner

//get
export interface BannerGetType {
  _id: string;
  title: string;
  image: string;
  url: string;
  createdAt: string;
  updatedAt: string;
}

//post and put
export interface BannerPostType {
  title: string;
  image: string;
  url: string;
}

//repsonse
export interface BannerResponseType {
  success: boolean;
  message: string;
  data: BannerGetType[];
}

export interface BannerFormStateType {
  title: string;
  url: string;
  imageSrc: string;
  image: string;
}

export interface BannerStateType {
  creat: boolean;
  updateId: string;
  data: BannerPostType;
}

export interface BannerObjectType {
  close: () => void;
  bannerData: BannerStateType;
  refetch: () => Promise<QueryObserverResult<BannerResponseType, Error>>;
}

//Product
//get
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

export interface ProductPostType {
  category: string;
  discription: string;
  isDraft: boolean;
  images: string[];
  name: string;
  price: number;
  slug: string;
}

export interface ProductResponseType {
  success: boolean;
  message: string;
  data: ProductGetType[];
}

//universal delete type response
export interface DeletResponseType {
  success: boolean;
  message: string;
}
