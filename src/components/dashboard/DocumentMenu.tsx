"use client";

import { LucideIcon } from "lucide-react";

import SideBarMenu from "../share/SideBarMenu";

interface MenuItem {
  title: string;
  icon: LucideIcon;
  isActive?: boolean;
  url: string;
}

interface DocumentDropDownProps {
  items: MenuItem[];
}

export default function DocumentMenu({ items }: DocumentDropDownProps) {
  return <SideBarMenu items={items} />;
}
