"use client";

import { SideBarContent } from "@/components/dashboard/SideBarContent";
import AiDropDown from "./AiDropDown";
import DocumentDropDown from "./DocumentDropDown";
import { FooterSidebar } from "@/components/dashboard/FooterSidebar";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import { data } from "@/components/dashboard/MenuItem";

export function AppSidebar() {
  const getTheme = () => {
    const localTheme = localStorage.getItem("theme");

    if (localTheme) {
      return localTheme;
    }
    return "light";
  };
  return (
    <Sidebar className="w-64 min-h-screen flex flex-col rounded-l-2xl">
      <SidebarContent
        className={`flex flex-col justify-between h-full  p-4 ${getTheme()}`}
      >
        <div>
          <SidebarGroup className="gap-8">
            <SidebarGroupLabel className="flex justify-center items-center me-10">
              <h1 className="text-sm font-bold">File Management</h1>
            </SidebarGroupLabel>
            <SidebarGroupContent className="mb-1">
              <SideBarContent items={data.Dashboard} />
            </SidebarGroupContent>
            <SidebarGroupContent className="mb-1">
              <DocumentDropDown items={data.menuItems} />
            </SidebarGroupContent>
            <SidebarGroupContent className="mb-1">
              <AiDropDown items={data.chatbot} />
            </SidebarGroupContent>
          </SidebarGroup>
        </div>
        <FooterSidebar />
      </SidebarContent>
    </Sidebar>
  );
}
