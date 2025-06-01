"use client";

import React from "react";

import clsx from "clsx";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { DialogProps } from "@radix-ui/react-dialog";

interface MDialogProps extends Omit<DialogProps, "ref"> {
  header?: string | React.ReactNode;
  content?: React.ReactNode;
  footer?: React.ReactNode;
  trigger?: React.ReactNode;
  description?: string | React.ReactNode;
  className?: string;
  asChild?: boolean;
  titleClassName?: string;
  descriptionClassName?: string;
  onOpenChange?: (open: boolean) => void;
  hideCloseButton?: boolean;
  onOpenAutoFocus?: (event: Event) => void;
}

const MDialog = React.forwardRef<HTMLDivElement, MDialogProps>(
  (
    {
      header,
      content,
      footer,
      trigger,
      className,
      asChild = true,
      description,
      titleClassName,
      descriptionClassName,
      onOpenChange,
      hideCloseButton,
      onOpenAutoFocus,
      ...props
    },
    ref
  ) => {
    const handleOpenChange = (open: boolean) => {
      onOpenChange?.(open);
    };
    // get bg-color from className;

    return (
      <Dialog {...props} onOpenChange={handleOpenChange}>
        {trigger && (
          <DialogTrigger asChild={asChild} className="w-full h-full">
            {trigger}
          </DialogTrigger>
        )}
        <DialogContent
          autoFocus={false}
          onOpenAutoFocus={onOpenAutoFocus}
          aria-describedby={undefined}
          className={clsx(
            "rounded-xl sm:max-w-[400px] w-[90%] max-w-[92%] left-[50%] sm:left-[50%] top-[50%] sm:top-[50%] -translate-x-[50%] sm:-translate-x-[50%] -translate-y-[50%] sm:-translate-y-[50%]",
            className
          )}
          ref={ref}
        >
          <DialogHeader>
            {header ? (
              <>
                <DialogTitle className={clsx("text-left", titleClassName)}>
                  {header}
                </DialogTitle>
                {description && (
                  <DialogDescription
                    className={clsx("text-left", descriptionClassName)}
                  >
                    {description}
                  </DialogDescription>
                )}
              </>
            ) : (
              <VisuallyHidden asChild>
                <DialogTitle>Dialog</DialogTitle>
              </VisuallyHidden>
            )}
          </DialogHeader>
          {content}
          {footer && <DialogFooter>{footer}</DialogFooter>}
        </DialogContent>
      </Dialog>
    );
  }
);

MDialog.displayName = "MDialog";

export default MDialog;
