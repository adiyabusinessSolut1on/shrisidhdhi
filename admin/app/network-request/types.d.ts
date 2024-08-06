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
interface CategoryForm {
  creat: boolean;
  updateId: string;
  data: string;
}
export interface CategoryObjectTypes {
  isCategoryForm: {
    creat: boolean;
    updateId?: string;
    data?: string;
  };
  setCategoryForm: React.Dispatch<React.SetStateAction<CategoryForm>>;
  refetch: () => Promise<QueryObserverResult<CategoryResponseType, Error>>;
}
