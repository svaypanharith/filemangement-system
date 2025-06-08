"use client";
import { SidebarFooter } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";

import { data } from "./MenuItem";
import SettingMenus from "./SettingMenus";

export function FooterSidebar() {
  return (
    <SidebarFooter className="mt-auto gap-6">
      <Separator className="my-4" />
      <SettingMenus items={data.Settings} />
    </SidebarFooter>
  );
}
