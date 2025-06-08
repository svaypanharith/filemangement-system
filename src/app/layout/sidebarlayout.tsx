"use client";

import type React from "react";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import Header from "./header";
import { AppSidebar } from "@/components/dashboard/AppSidebar";
// import { useSelector } from "react-redux";
// import { RootState } from "@/redux/store";
// import { useEffect } from "react";
// import { getLocalStorage, setLocalStorage } from "@/utils/storage";
import { ThemeProvider } from "@/provider/ThemProvider";

interface SidebarLayoutProps {
  children: React.ReactNode;
  theme?: string;
}

export default function SidebarLayout({ children }: SidebarLayoutProps) {
  // my code implement
  // useEffect(() => {
  //   const initialTheme = getLocalStorage("theme");
  //   if (initialTheme === "") {
  //     setLocalStorage("theme", "light");
  //   } else {
  //     return;
  //   }
  // }, []);

  // const theme = useSelector((state: RootState) => state.changeThemeColor.theme);

  // useEffect(() => {
  //   const initialTheme = getLocalStorage("theme");
  //   if (theme || initialTheme === "dark") {
  //     document.documentElement.classList.add("dark");
  //   } else {
  //     document.documentElement.classList.remove("dark");
  //   }
  // }, [theme]);

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <div className="flex h-full flex-col gap-4">
            <main className="flex-1 overflow-auto">
              <div className="flex flex-col gap-4 py-6 px-10">
                <Header />
                <div className="flex flex-col mt-6">{children}</div>
              </div>
            </main>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </ThemeProvider>
  );
}
