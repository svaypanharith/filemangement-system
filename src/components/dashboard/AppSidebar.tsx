"use client";

import { DashboardMenu } from "@/components/dashboard/DashboardMenu";
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
import { useTranslation } from "react-i18next";

import { data } from "@/components/dashboard/MenuItem";

export function AppSidebar() {
  const { t } = useTranslation();
  return (
    <Sidebar
      className={`w-64
     min-h-screen flex flex-col rounded-l-2xl bg-black`}
    >
      <SidebarContent className={`flex flex-col justify-between h-full  p-4`}>
        <div>
          <SidebarGroup className="gap-8">
            <SidebarGroupLabel className="flex justify-center items-center me-10">
              <h1 className="text-sm font-bold">
                {t("welcome.file_management")}
              </h1>
            </SidebarGroupLabel>
            <SidebarGroupContent className="mb-1">
              <DashboardMenu items={data.Dashboard} />
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
