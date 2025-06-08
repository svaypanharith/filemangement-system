"use client";

import { LucideIcon } from "lucide-react";

import SideBarMenu from "../share/SideBarMenu";

interface SubItem {
  title: string;
  url: string;
}

interface MenuItem {
  title: string;
  url: string;
  icon: LucideIcon;
  isActive?: boolean;
}

interface ChatBotMenuProps {
  items: MenuItem[];
  // groupLabel?: string;
}

export default function ChatBotMenu({ items }: ChatBotMenuProps) {
  return <SideBarMenu items={items} collapsible={true} />;
}
