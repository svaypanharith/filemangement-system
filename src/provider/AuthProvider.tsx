"use client";

import { createContext, useContext, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Cookies from "js-cookie";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
  setCredentials,
  logout as logoutAction,
} from "@/redux/slices/auth-slice";

interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const login = (newToken: string) => {
    Cookies.set("auth_token", newToken, {
      expires: 365,
    });
    dispatch(setCredentials());
    router.push("/dashboard");
  };

  const token = Cookies.get("auth_token") || null;

  const logout = () => {
    Cookies.remove("auth_token");
    dispatch(logoutAction());
    router.push("/");
  };
  useEffect(() => {
    if (token && pathname === "/" && isAuthenticated) {
      router.push("/dashboard");
    }
  }, [token, dispatch, isAuthenticated, pathname, router]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
