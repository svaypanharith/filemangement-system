import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import clsx from "clsx";
import React, { ReactNode } from "react";
import { Loader2 } from "lucide-react";

interface MAlertDialogProps {
  title: ReactNode;
  description?: ReactNode;
  open: boolean;
  onOpenChange?: (open: boolean) => void;
  onConfirm: () => void;
  cancelText?: ReactNode;
  confirmText?: ReactNode;
  preset?: "destructive" | "default" | "primary";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  onCancel?: () => void;
}

const MAlertDialog = React.forwardRef<HTMLButtonElement, MAlertDialogProps>(
  (
    {
      title,
      description,
      open,
      onOpenChange,
      onConfirm,
      preset = "default",
      size = "md",
      loading,
      onCancel,
      ...props
    },
    ref
  ) => {
    const presetStyles = {
      default: "bg-white text-black hover:bg-gray-100",
      destructive: "bg-red-500 text-white hover:bg-red-600",
      primary: "bg-primary text-white hover:bg-primary/90",
      dark: "bg-black text-white hover:bg-black/90",
    };

    const sizeStyles = {
      sm: "w-[300px]",
      md: "w-[370px]",
      lg: "w-[450px]",
    };

    return (
      <AlertDialog open={open} onOpenChange={onOpenChange}>
        <AlertDialogContent
          className={clsx(
            "bg-white   w-[90%] max-w-[90%] left-[50%] sm:left-[49.26%] top-[50%] sm:top-[49.45%] -translate-x-[50%] sm:-translate-x-[49.45%] -translate-y-[50%] sm:-translate-y-[49.45%]  rounded-xl",
            sizeStyles[size],
            open
              ? "animate-in fade-in-0 zoom-in-95"
              : "animate-out fade-out-0 zoom-out-95"
          )}
        >
          <div className="flex flex-col gap-2">
            {title && <AlertDialogTitle>{title}</AlertDialogTitle>}
            {description && (
              <AlertDialogDescription>{description}</AlertDialogDescription>
            )}
          </div>
          <AlertDialogFooter className="flex flex-row gap-3 sm:gap-2  justify-end">
            {props.cancelText && (
              <AlertDialogCancel
                className="rounded-lg w-20 cursor-pointer"
                onClick={onCancel}
              >
                {props.cancelText}
              </AlertDialogCancel>
            )}
            {props.confirmText && (
              <AlertDialogAction
                onClick={onConfirm}
                disabled={loading}
                ref={ref}
                className={clsx(
                  "rounded-lg sm:mt-0 mt-2 w-20 cursor-pointer",
                  presetStyles[preset as keyof typeof presetStyles],
                  loading && "opacity-50 cursor-not-allowed "
                )}
              >
                {loading ? (
                  <Loader2
                    size={18}
                    strokeWidth={1.5}
                    className="animate-spin"
                  />
                ) : (
                  props.confirmText
                )}
              </AlertDialogAction>
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }
);
MAlertDialog.displayName = "MAlertDialog";

export default MAlertDialog;
