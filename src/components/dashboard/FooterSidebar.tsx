"use client";
import { SidebarFooter } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { MenuData } from "./MenuItem";
// import SideBarMenu from "../share/SideBarMenu";

export function FooterSidebar() {
  const data = MenuData();

  return (
    <SidebarFooter className="mt-auto gap-6">
      <Separator className="my-4" />
      {/* <SideBarMenu items={data.Settings} /> */}
    </SidebarFooter>
  );
}
