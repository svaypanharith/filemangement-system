"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import SwitchLanguage from "@/components/share/SwitchLanguage";

export default function Header() {
  return (
    <div className="flex items-center justify-between sticky top-0  z-10 dark:bg-slate-950 ">
      <SidebarTrigger className="cursor-pointer" />
      <div className="flex items-center gap-4">
        <SwitchLanguage />
        <span>Svay Phanharith</span>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}
