"use client";

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
import SideBarMenu from "../share/SideBarMenu";

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
              <SideBarMenu items={data.Dashboard} />
              <SideBarMenu items={data.menuItems} />
              <SideBarMenu items={data.chatbot} collapsible={true} />
            </SidebarGroupContent>
          </SidebarGroup>
        </div>
        <FooterSidebar />
      </SidebarContent>
    </Sidebar>
  );
}
