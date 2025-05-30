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
        "flex items-center justify-center w-full h-screen bg-gray-50 ",
        outsideClassName,
        className
      )}
    >
      <div className={clsx(insideClassName, "w-full h-full")}>{children}</div>
    </div>
  );
}
