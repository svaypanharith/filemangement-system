"use client";
import SidebarLayout from "@/app/layout/sidebarlayout";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SidebarLayout>{children}</SidebarLayout>;
}
