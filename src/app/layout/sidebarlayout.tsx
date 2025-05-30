"use client";

import type React from "react";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import Header from "./header";
import { AppSidebar } from "@/components/dashboard/AppSidebar";
export default function SidebarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="flex h-full flex-col gap-4 ">
          <main className="flex-1 overflow-auto">
            <div className="flex flex-col gap-4 py-6 px-10">
              <Header />
              {children}
            </div>
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
