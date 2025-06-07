"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

interface HeaderProps {
  title: string;
  back?: boolean;
}

export default function Header({ title, back }: HeaderProps) {
  const router = useRouter();

  return (
    <div
      className="flex gap-2 items-center cursor-pointer"
      onClick={() => router.back()}
    >
      {back && (
        <ChevronLeft
          className="w-6 h-6 text-black dark:text-white"
          strokeWidth={1.5}
        />
      )}
      <p className="text-lg font-bold">{title}</p>
    </div>
  );
}
