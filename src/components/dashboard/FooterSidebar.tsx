"use client";
import {
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import AICredit from "../chatbot/CreditAi";
import { LogOut } from "lucide-react";
import LogoutDialog from "./logout";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";

export function FooterSidebar() {
  const [open, setOpen] = useState(false);
  return (
    <SidebarFooter className="mt-auto gap-3">
      <Separator className="my-4" />
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            onClick={() => setOpen(true)}
            className="w-full text-lg flex align-center justify-center cursor-pointer transition-all duration-200 p-3 rounded-full flex items-center gap-3 bg-red-500 hover:bg-red-600 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] "
          >
            <LogOut className="w-5 h-5 text-white" />
            <span className="text-white font-medium">Logout</span>
          </SidebarMenuButton>
          <LogoutDialog
            open={open}
            onOpenChange={setOpen}
            onSuccess={() => {
              setOpen(false);
            }}
          />
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  );
}
