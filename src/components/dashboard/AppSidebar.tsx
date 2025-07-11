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
import { MenuData } from "./MenuItem";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export function AppSidebar() {
  const { t } = useTranslation();
  const data = MenuData();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedSessionId, setSelectedSessionId] = useState<number | null>(null);

  useEffect(() => {
    const sessionParam = searchParams.get('session');
    if (sessionParam) {
      setSelectedSessionId(parseInt(sessionParam));
    }
  }, [searchParams]);

  const handleSessionSelect = (sessionId: number) => {
    setSelectedSessionId(sessionId);
    router.push(`/dashboard/chatbot?session=${sessionId}`);
  };

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
            <SidebarGroupContent className="flex flex-col gap-8">
              <SideBarMenu items={data.Dashboard} />
              <SideBarMenu items={data.menuItems} />
              <SideBarMenu 
                items={data.chatbot} 
                collapsible={true}
                onSessionSelect={handleSessionSelect}
                selectedSessionId={selectedSessionId}
              />
            </SidebarGroupContent>
          </SidebarGroup>
        </div>
        <FooterSidebar />
      </SidebarContent>
    </Sidebar>
  );
}
