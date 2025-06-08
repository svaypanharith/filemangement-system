"use client";

import { ChevronRight, LucideIcon } from "lucide-react";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Collapsible, CollapsibleTrigger } from "../ui/collapsible";

interface SideBarMenuProps {
  items: MenuItem[];
  collapsible?: boolean;
}

interface MenuItem {
  title: string;
  url: string;
  icon: LucideIcon;
  isActive?: boolean;
}

export default function SideBarMenu({
  items,
  collapsible = false,
}: SideBarMenuProps) {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.url;

          return (
            <SidebarMenuItem key={item.title}>
              {isActive && (
                <div className="absolute left-[-10px] top-0 w-1 rounded-2xl shadow-lg h-full bg-gradient-to-b from-blue-500 to-blue-600"></div>
              )}
              {collapsible ? (
                <Collapsible
                  key={item.title}
                  defaultOpen={item.isActive}
                  className="group/collapsible"
                >
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                      tooltip={item.title}
                      className={`cursor-pointer transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full ${
                        isActive ? "bg-gray-100 dark:bg-gray-800" : ""
                      }`}
                    >
                      {item.icon && (
                        <item.icon
                          className={`w-5 h-5 transition-colors duration-200 ${
                            isActive ? "text-blue-500" : "text-gray-500"
                          }`}
                        />
                      )}
                      <Link href={item.url || ""} className="flex-1">
                        <span
                          className={`text-xl font-medium transition-colors duration-200 ${
                            isActive
                              ? "text-blue-500"
                              : "text-gray-700 dark:text-gray-300"
                          }`}
                        >
                          {item.title}
                        </span>
                      </Link>
                      <ChevronRight className="ml-auto transition-all duration-200 group-data-[state=open]/collapsible:rotate-90 text-black" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                </Collapsible>
              ) : (
                <SidebarMenuButton
                  className={`transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl ${
                    isActive ? "bg-gray-100 dark:bg-gray-800" : ""
                  }`}
                >
                  <Link
                    href={item.url || ""}
                    className="flex items-center gap-3 w-full"
                  >
                    {Icon && (
                      <Icon
                        className={`w-5 h-5 transition-colors duration-200 ${
                          isActive ? "text-blue-500" : "text-gray-500"
                        }`}
                      />
                    )}
                    <span
                      className={`text-xl font-medium transition-colors duration-200 ${
                        isActive
                          ? "text-blue-500"
                          : "text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      {item.title}
                    </span>
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
