"use client";

import MDialog from "@/components/m-ui/m-dialog";
import ChangePasswordForm from "@/components/setting/ChangePasswordForm";
import MButton from "@/components/m-ui/m-button";

interface ChangePasswordDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ChangePasswordDialog({
  open,
  onOpenChange,
}: ChangePasswordDialogProps) {
  return (
    <MDialog
      open={open}
      onOpenChange={onOpenChange}
      description="Change your password to secure your account"
      header="Change Password"
      content={<ChangePasswordForm />}
      footer={
        <div className="flex justify-end gap-2">
          <MButton
            preset="secondary"
            size="sm"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </MButton>
          <MButton preset="primary" size="sm">
            Change Password
          </MButton>
        </div>
      }
    />
  );
}
