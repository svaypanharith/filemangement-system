"use client";


import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import SwitchLanguage from "@/components/share/SwitchLanguage";
import { MSidebarTrigger } from "@/components/m-ui/m-sidebar-trigger";
import { useSelector } from "react-redux";
import { RootState} from "@/redux/store";
import { Sparkles, Settings, Folder, MessageCircle, LayoutDashboard } from "lucide-react";

import { useGetProfileInfoQuery } from "@/redux/slices/data-slice";
export default function Header() {
  const getIconComponent = (iconName?: string) => {
    switch (iconName) {
      case "sparkles":
        return <Sparkles className="w-6 h-6 text-purple-600" />;
      case "settings":
        return <Settings className="w-6 h-6 text-gray-500" />;
      case "folder":
        return <Folder className="w-5 h-5 text-gray-500" />;
      case "message-circle":
        return <MessageCircle className="w-5 h-5 text-gray-500" />;
      case "layout-dashboard":
        return <LayoutDashboard className="w-5 h-5 text-gray-500" />;
      default:
        return null;
    }
  };
  const { data: profile } = useGetProfileInfoQuery();

  const { text, iconName } = useSelector((state: RootState) => state.sidebarTriggerText);
  const icon = getIconComponent(iconName);
  return (
    <div className="flex items-center justify-between sticky top-0 z-10">
      <div className="px-8 cursor-pointer">
        <MSidebarTrigger icon={icon} text={text} />
      </div>
      <div className="flex items-center gap-4">
        <SwitchLanguage />
        <span>{profile?.user.email}</span> 
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}
