"use client";

import SwitchLanguage from "@/components/share/SwitchLanguage";
import { MSidebarTrigger } from "@/components/m-ui/m-sidebar-trigger";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
  Sparkles,
  Settings,
  Folder,
  MessageCircle,
  LayoutDashboard,
  Bell,
} from "lucide-react";

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

  const { text, iconName } = useSelector(
    (state: RootState) => state.sidebarTriggerText
  );
  const icon = getIconComponent(iconName);
  return (
    <div className="flex items-center justify-between sticky top-0 z-10">
      <div className="px-8 cursor-pointer">
        <MSidebarTrigger icon={icon} text={text} />
      </div>
      <div className="flex items-center gap-4">
        <SwitchLanguage />
        <span>{profile?.user.email}</span>
        <div className="bg-gray-100 rounded-full p-2 cursor-pointer">
          <span className="text-sm font-medium text-gray-500 w-8 h-8 flex items-center justify-center">
            {profile?.user.email.split("@")[0].slice(0, 1).toUpperCase()}
          </span>
        </div>
      </div>
    </div>
  );
}
