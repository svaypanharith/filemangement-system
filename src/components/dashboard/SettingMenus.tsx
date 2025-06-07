"use client";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { ChevronRight, type LucideIcon } from "lucide-react";
import Link from "next/link";

interface SubItem {
  title: string;
  url: string;
}

interface MenuItem {
  title: string;
  url?: string;
  icon?: LucideIcon;
  isActive?: boolean;
  items?: SubItem[];
}

interface SettingMenusProps {
  items: MenuItem[];
  groupLabel?: string;
}
export default function SettingMenus({ items }: SettingMenusProps) {
  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton>
              {item.icon && <item.icon className="w-5 h-5" />}
              <Link href={item.url || ""}>
                <span className="text-lg">{item.title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
