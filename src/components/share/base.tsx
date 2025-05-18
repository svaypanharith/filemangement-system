"use client";

import clsx from "clsx";
import React from "react";

interface BaseProps {
  children: React.ReactNode;
  className?: string;
  outsideClassName?: string;
  insideClassName?: string;
}

export default function Base({
  children,
  className,
  outsideClassName,
  insideClassName,
}: BaseProps) {
  return (
    <div
      className={clsx(
        "flex items-center justify-center w-full min-h-screen bg-slate-50 dark:bg-slate-950 p-4 md:p-0",
        outsideClassName,
        className
      )}
    >
      <div
        className={clsx(
          "bg-white dark:bg-slate-950 w-full rounded-lg shadow-lg",
          // Mobile: max width 430px
          "max-w-[430px] h-[calc(100vh-2rem)]",
          // Desktop: full screen
          "md:max-w-none md:h-screen md:rounded-none",
          insideClassName
        )}
      >
        {children}
      </div>
    </div>
  );
}
