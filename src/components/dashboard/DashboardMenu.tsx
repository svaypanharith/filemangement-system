"use client";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { ChevronRight, type LucideIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

interface SubItem {
  title: string;
  url: string;
}

interface MenuItem {
  title: string;
  url?: string;
  icon: LucideIcon;
  items?: SubItem[];
  isActive?: boolean;
}

export function DashboardMenu({ items }: { items: MenuItem[] }) {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <Separator className="my-2" />
      <SidebarMenu className="py-2 space-y-1">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <SidebarMenuItem key={item.title}>
              {item.items ? (
                <div>
                  <SidebarMenuButton className="w-full transition p-2 flex items-center gap-2 hover:bg-gray-200 rounded-lg">
                    <div
                      className={`flex gap-2 items-center ${
                        pathname === item.url ? "text-black" : "text-gray-500"
                      }`}
                    >
                      {Icon && <Icon className="w-5 h-5" aria-hidden="true" />}
                      <span className="text-lg">{item.title}</span>
                    </div>
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                  <SidebarMenuSub>
                    {item.items.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton asChild>
                          <Link
                            href={subItem.url}
                            className={`flex gap-2 p-2 text-sm hover:bg-gray-200 rounded-lg ${
                              pathname === subItem.url
                                ? "bg-white text-black"
                                : "text-gray-500"
                            }`}
                          >
                            <span>{subItem.title}</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </div>
              ) : (
                <SidebarMenuButton
                  asChild
                  className="w-full transition p-4 flex items-center gap-2 hover:bg-gray-200 rounded-lg"
                >
                  <Link
                    href={item.url || "#"}
                    className={`flex gap-2 ${
                      pathname === item.url ? "bg-white text-black" : "text-red"
                    }`}
                  >
                    {Icon && <Icon className="w-5 h-5" aria-hidden="true" />}
                    <span className="text-lg">{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              )}
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
