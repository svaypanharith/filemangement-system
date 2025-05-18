"use client";

import { Input } from "../ui/input";
import { cn } from "@/lib/utils";

interface MInputProps {
  label?: string;
  placeholder?: string;
  type?: string;
  className?: string;
  required?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function MInput({
  label,
  placeholder,
  type,
  onChange,
  className,
  required,
}: MInputProps) {
  console.log("type", type);
  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm text-black">
        {label}
        {required && <span className="text-red-500 p-1">*</span>}
      </p>
      <Input
        className={cn(
          className,
          "h-15 rounded-lg shadow-sm border border-gray-200 rounded-lg"
        )}
        placeholder={placeholder}
        type={type}
        onChange={onChange}
      />
    </div>
  );
}
