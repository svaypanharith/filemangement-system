"use client";

import { ChevronRight, LucideIcon, MessageSquare } from "lucide-react";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { getLocalStorage } from "@/utils/storage";
import { useEffect, useState } from "react";
import { setLocalStorage } from "@/utils/storage";

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
  const chatHistory = getLocalStorage("chat_history");
  const [chatHistoryItems, setChatHistoryItems] = useState<any[]>([]);
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);
  useEffect(() => {
    if (chatHistory) {
      const chatHistoryItems = JSON.parse(chatHistory);
      setChatHistoryItems(chatHistoryItems);
    }
  }, [chatHistory]);

  useEffect(() => {
    if (selectedSessionId) {
      setLocalStorage("selected_session_id", selectedSessionId);
    }
  }, [selectedSessionId]);

  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.url;

          return (
            <SidebarMenuItem key={item.title}>
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
                      <ChevronRight className="ml-auto transition-all duration-200 group-data-[state=open]/collapsible:rotate-90 text-gray-500" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>

                  <CollapsibleContent className="flex flex-col gap-2 mt-3 overflow-y-auto max-h-[400px]">
                    {chatHistoryItems.map((data) => (
                      <div key={data.session_id} className="group relative">
                        <div
                          onClick={() => {
                            setSelectedSessionId(data.session_id);
                          }}
                          className="flex items-start gap-3 p-2
                           cursor-pointer"
                        >
                          <div className="flex-shrink-0 mt-0.5">
                            <MessageSquare className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors duration-200" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm truncate max-w-[300px]">
                              {data.user_message}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                    {chatHistoryItems.length === 0 && (
                      <div className="flex flex-col items-center justify-center py-8 text-center">
                        <MessageSquare className="w-8 h-8 text-gray-300 mb-2" />
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          No chat history yet
                        </p>
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                          Start a conversation to see it here
                        </p>
                      </div>
                    )}
                  </CollapsibleContent>
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
