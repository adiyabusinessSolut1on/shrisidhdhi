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
