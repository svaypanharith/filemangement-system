"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useSidebar } from "../ui/sidebar";


interface MSidebarTriggerProps {
  className?: string;
  icon?: React.ReactNode;
  text?: string;
}

export const MSidebarTrigger = ({ className, icon, text }: MSidebarTriggerProps) => {
  const { toggleSidebar } = useSidebar();
  return (
    <Button
      data-sidebar="trigger"
      data-slot="sidebar-trigger"
      variant="ghost"
      size="icon"
      className={cn("size-7", "hover:bg-transparent cursor-pointer")}
      style={{ cursor: "pointer" }}
      onClick={(event) => {
        toggleSidebar();
      }}
    >
      <div className="flex items-center gap-4">
        {icon}
        {text && <span className="text-xl font-bold">{text}</span>}
      </div>
      {/* <span className="sr-only">Toggle Sidebar</span> */}
    </Button>
  )
}