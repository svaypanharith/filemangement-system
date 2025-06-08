"use client";

import SideBarMenu from "../share/SideBarMenu";

interface SubItem {
  title: string;
  url: string;
}

interface MenuItem {
  title: string;
  url: string;
  icon: LucideIcon;
}

export function DashboardMenu({ items }: { items: MenuItem[] }) {
  return <SideBarMenu items={items} />;
}
