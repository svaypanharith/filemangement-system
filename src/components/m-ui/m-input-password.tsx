"use client";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

interface MInputPasswordProps {
  label?: string;
  placeholder?: string;

  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  className?: string;
}

export default function MInputPassword({
  label,
  placeholder,

  onChange,
  required,
  className,
}: MInputPasswordProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <p className="text-sm text-black">
          {label}
          {required && <span className="text-red-500 p-1">*</span>}
        </p>
      )}
      <div className="relative">
        <Input
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          onChange={onChange}
          className={cn(
            "h-15 rounded-lg shadow-sm border border-gray-200 rounded-lg",
            className
          )}
        />
        <button
          type="button"
          className="absolute right-2 top-1/2 -translate-y-1/2"
        >
          {showPassword ? (
            <Eye
              className="w-4 h-4"
              onClick={() => setShowPassword(!showPassword)}
            />
          ) : (
            <EyeOff
              className="w-4 h-4"
              onClick={() => setShowPassword(!showPassword)}
            />
          )}
        </button>
      </div>
    </div>
  );
}
