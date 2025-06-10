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
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
 
}

export interface SignIn{
  email: string;
  password: string;
}

export interface SignUp{
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}