"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import SwitchLanguage from "@/components/share/SwitchLanguage";
import { useSelector } from "react-redux";
import { useAuth } from "@/provider/AuthProvider";
import { RootState } from "@/redux/store";

export default function Header() {
  const { user, token } = useSelector((state: RootState) => state.auth);
  console.log("user", user);
  console.log("token", token);

  return (
    <div className="flex items-center justify-between sticky top-0  z-10  ">
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
