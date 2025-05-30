import { Link, MessageCircle, LayoutDashboard, File } from "lucide-react";

const data = {
  menuItems: [
    {
      title: "Document",
      url: "/dashboard/document",
      icon: File,
      items: [
        {
          title: "add document",
          url: "/dashboard/document",
        },
      ],
    },
  ],
  Dashboard: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
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
