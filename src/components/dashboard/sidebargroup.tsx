"use client";

import { LogOut } from "lucide-react";
import { useState } from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { menuItems } from "@/components/dashboard/menu-item";
import { usePathname } from "next/navigation";

export function AppSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      <Sidebar className="w-64 min-h-screen flex flex-col rounded-l-2xl">
        <SidebarContent className="flex flex-col justify-between h-full bg-gray-100 p-4">
          <div>
            <SidebarGroup>
              <SidebarGroupLabel className="flex justify-center items-center  me-10">
                <h1 className="text-sm font-bold">File Management</h1>
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu className="py-10 gap-3">
                  {menuItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton
                          asChild
                          className="w-full transition p-3 flex items-center gap-3 text-lg"
                        >
                          <a
                            href={item.url}
                            className={`flex gap-2 ${
                              pathname === item.url
                                ? "bg-white text-black rounded-xl"
                                : "text-gray-500"
                            }`}
                          >
                            {Icon && (
                              <Icon className="w-5 h-5" aria-hidden="true" />
                            )}
                            <span className="text-sm">{item.title}</span>
                          </a>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </div>
          <SidebarFooter className="mt-auto">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => setOpen(true)}
                  className="w-full text-red-500 text-lg hover:bg-red-600 hover:text-white transition p-3 rounded-md flex items-center gap-3"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </SidebarContent>
      </Sidebar>
    </>
  );
}
