export interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserResponse {
  data: {
    user: User;
  };
  message: string;
  status: number;
}

export interface AuthResponse {
  data: {
    token: string;
    message: string;
    status: number;
  }
  message: string;
  status: number;
}

export interface AuthState {
  data: {
    token: string;
  } | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  status: string | number | boolean | null;
  message: string | null;
}

export interface SignIn {
  email: string;
  password: string;
}

export interface SignUp {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirm_password: string;
}

export interface ChatRequest {
  user_id: string;
  user_message: string;
  start_session: boolean;
  status: string;
}

export interface ChatResponseData {
  data: {
    user_message: string;
    ai_response: string;
    session_id: string;
    created_at: string;
    updated_at: string;
    status: string;
    id: number;
    user_id: string;
  }
}
