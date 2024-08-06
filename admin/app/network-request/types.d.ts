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
export interface DeletResponseType {
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
