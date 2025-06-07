"use client";

import React from "react";
import { cn } from "@/lib/utils";
import clsx from "clsx";
import { Loader2 } from "lucide-react";
import { ButtonProps } from "@/components/ui/button";

interface MButtonProps {
  loading?: boolean;
  disabled?: boolean;
  full?: boolean;
  preset?: "primary" | "secondary" | "danger" | "warning" | "success";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const MButton = React.forwardRef<HTMLButtonElement, ButtonProps & MButtonProps>(
  (
    {
      loading,
      disabled,
      preset,
      size,
      full,
      children,
      onClick,
      className,
      ...props
    },
    ref
  ) => {
    const sizeStyle = {
      sm: "text-sm px-4 py-2",
      md: "text-base px-6 py-3",
      lg: "text-lg px-8 py-4",
    };
    const presetStyle = {
      primary: "bg-indigo-700 text-white hover:bg-indigo-800 rounded-full",
      secondary:
        "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80 rounded-full",
      danger:
        "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60 rounded-full",
      warning:
        "bg-warning text-warning-foreground shadow-xs hover:bg-warning/90 focus-visible:ring-warning/20 dark:focus-visible:ring-warning/40 dark:bg-warning/60",
      success:
        "bg-success text-success-foreground shadow-xs hover:bg-success/90 focus-visible:ring-success/20 dark:focus-visible:ring-success/40 dark:bg-success/60 rounded-full",
    };
    const postSetClassName = clsx(
      "active:opacity-70 transition-colors active:[transform:translate3d(0,2px,0)]  cursor-pointer",
      presetStyle[preset || ("primary" as keyof typeof presetStyle)],
      sizeStyle[size || ("sm" as keyof typeof sizeStyle)],
      { "w-full": full },
      className
    );

    return (
      <button
        ref={ref}
        {...props}
        className={cn(className, postSetClassName)}
        disabled={loading || disabled}
        onClick={onClick}
      >
        {loading ? <Loader2 className="animate-spin" /> : children}
      </button>
    );
  }
);

MButton.displayName = "MButton";

export default MButton;
