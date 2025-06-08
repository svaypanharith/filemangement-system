"use client";

import { DashboardMenu } from "@/components/dashboard/DashboardMenu";
import ChatBotMenu from "./ChatBotMenu";
import DocumentMenu from "./DocumentMenu";
import { FooterSidebar } from "@/components/dashboard/FooterSidebar";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import { useTranslation } from "react-i18next";
import { Separator } from "@/components/ui/separator";

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
          <SidebarGroup className="gap-4">
            <SidebarGroupLabel className="flex justify-center items-center ">
              <h1 className="text-xl font-bold">
                {t("welcome.file_management")}
              </h1>
            </SidebarGroupLabel>
            <Separator />
            <SidebarGroupContent className="flex flex-col gap-10">
              <DashboardMenu items={data.Dashboard} />
              <DocumentMenu items={data.menuItems} />
              <ChatBotMenu items={data.chatbot} />
            </SidebarGroupContent>
          </SidebarGroup>
        </div>
        <FooterSidebar />
      </SidebarContent>
    </Sidebar>
  );
}
