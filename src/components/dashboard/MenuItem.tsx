"use client";
import { MessageCircle, LayoutDashboard, File, Settings } from "lucide-react";
import { useTranslation } from "react-i18next";

export const MenuData = () => {
  const { t } = useTranslation();

  return {
    menuItems: [
      {
        title: t("dashboard.document"),
        url: "/dashboard/document",
        icon: File,
      },
    ],
    Dashboard: [
      {
        title: t("dashboard.dashboard"),
        url: "/dashboard",
        icon: LayoutDashboard,
      },
    ],
    Settings: [
      {
        title: t("setting.setting"),
        url: "/dashboard/setting",
        icon: Settings,
      },
    ],
    chatbot: [
      {
        title: t("dashboard.chatbot"),
        url: "/dashboard/chatbot",
        icon: MessageCircle,
        isActive: true,
        items: [
          {
            title: "ASK AI",
            url: "chatbot",
          },
        ],
      },
    ],
  };
};
