"use client";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import { FormControl } from "@/components/ui/form";
import { FormField } from "@/components/ui/form";
import { Control } from "react-hook-form";

const password_error_messages = {
  password_required: "Password is required",
  password_required_to_be_capital_letter_and_number:
    "Password must be at least 6 characters long and contain at least one capital letter and one number",
};

export const passwordError = (error: string) => {
  return <p className="text-red-500 text-sm mt-4">{error}</p>;
};

export const passwordValidation = z
  .string()
  .min(1, password_error_messages.password_required)
  .regex(
    /^(?=.*[A-Z])(?=.*\d).{6,}$/,
    password_error_messages.password_required_to_be_capital_letter_and_number
  );

interface MInputPasswordProps {
  label?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  className?: string;
  error?: string;
  control?: Control<any>;
  name: string;
}

export default function MInputPassword({
  label,
  placeholder,
  onChange,
  required,
  className,
  error,
  control,
  name,
  ...props
}: MInputPasswordProps) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative">
      <FormField
        name={name}
        render={({ field }) => (
          <Input
            type={showPassword ? "text" : "password"}
            placeholder={placeholder}
            onChange={field.onChange}
            className={cn(
              "h-15 rounded-lg shadow-sm border border-gray-200",
              className
            )}
            {...props}
            ref={field.ref}
          />
        )}
      />
      <button
        type="button"
        onClick={togglePasswordVisibility}
        className="absolute right-2 top-1/2 -translate-y-1/2"
      >
        {showPassword ? (
          <Eye className="w-4 h-4" />
        ) : (
          <EyeOff className="w-4 h-4" />
        )}
      </button>

      {error && passwordError(error)}
    </div>
  );
}
