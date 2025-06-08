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
  items?: SubItem[];
}

interface SettingMenusProps {
  items: MenuItem[];
  groupLabel?: string;
}
export default function SettingMenus({ items }: SettingMenusProps) {
  return <SideBarMenu items={items} />;
}
