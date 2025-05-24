import {
  Link,
  MessageCircle,
  Network,
  User,
  LayoutDashboard,
  Image,
  Folder,
  File,
} from "lucide-react";

const menuItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Document",
    url: "/dashboard/document",
    icon: File,
  },
  {
    title: "Chatbot",
    url: "/dashboard/chatbot",
    icon: MessageCircle,
  },
  {
    title: "Folder",
    url: "/dashboard/folder",
    icon: Folder,
  },
];

export { menuItems };
