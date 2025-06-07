"use client";

import { ChevronRight, type LucideIcon } from "lucide-react";
import Link from "next/link";

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

interface SubItem {
  title: string;
  url: string;
}

interface MenuItem {
  title: string;
  icon?: LucideIcon;
  isActive?: boolean;
  url: string;
}

interface DocumentDropDownProps {
  items: MenuItem[];
  groupLabel?: string;
}

export default function DocumentDropDown({ items }: DocumentDropDownProps) {
  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton>
              <Link href={item.url} key={item.title}>
                <div className="flex items-center gap-2">
                  {item.icon && <item.icon className="w-5 h-5" />}
                  <span className="text-lg">{item.title}</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
