export interface user {
  user: {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  access_token: string;
  username: string;
  created_at: string;
  updated_at: string;
  }
}

interface statisticconfig {
  timerange: string;
  document: number;
}

export interface dailyaggregate {
  dailyDocumentCount: statisticconfig[]
}

export interface weeklyaggregate {
  weeklyDocumentCount: statisticconfig[]
}

export interface monthlyaggregate {
  monthlyDocumentCount: statisticconfig[]
}

export interface yearlyaggregate {
  yearlyDocumentCount: statisticconfig[]
}

export interface documentaggregate {
  totalDocuments: number;
  totalFileSize: number;
}

export interface statistic {
  total_document: number;
}

export interface DocumentType {
  documents: {
    id: string;
    color_code: string;
    tags: string;
    title: string;
    created_at: string;
    updated_at: string;
  }[]
}

export interface UserResponse {
  user: user;
  message: string;
  status: number;
  created_at: string;
  updated_at: string;
}

export interface AuthResponse {
  data: {
    user: user;
  }
  message: string;
  status: number;
}

export interface AuthState {
  data: user | null;
  access_token: string;
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
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  password_confirmation: string;
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
