import {
  Link,
  MessageCircle,
  LayoutDashboard,
  File,
  Settings,
} from "lucide-react";

const data = {
  menuItems: [
    {
      title: "Document",
      url: "/dashboard/document",
      icon: File,
    },
  ],
  Dashboard: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
  ],
  Settings: [
    {
      title: "Settings",
      url: "/dashboard/setting",
      icon: Settings,
    },
  ],
  chatbot: [
    {
      title: "Chatbot",
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

export { data };
