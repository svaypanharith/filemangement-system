export interface User { // Just testing not confirmed
  id: string;
  name: string;
  email: string;
  avatar: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  data: {
    message: string;
    status: number;
  }
  message: string;
  status: number;
}

export interface AuthState {
  user: string | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  status: string | number | boolean | null;
  message: string | null;

  data: {
    id: string;
  } | null;
 
}

export interface SignIn{
  email: string;
  password: string;
}

export interface SignUp{
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirm_password: string;
}