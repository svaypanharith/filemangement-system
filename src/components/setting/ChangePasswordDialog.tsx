"use client";

import MDialog from "@/components/m-ui/m-dialog";
import ChangePasswordForm from "@/components/auth/ChangePasswordForm";
import { useTranslation } from "react-i18next";
import { useUpdatePasswordMutation } from "@/redux/slices/data-slice";
import { toast } from "react-hot-toast";
import { useCallback } from "react";


interface ChangePasswordDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ChangePasswordDialog({
  open,
  onOpenChange,
}: ChangePasswordDialogProps) {
  const { t } = useTranslation();
  const [updatePassword, { isLoading }] = useUpdatePasswordMutation();
  const onSubmit =  useCallback(async (data: {
    newPassword: string;
    currentPassword: string;
    confirmPassword: string;
  }) => {
    try {
      const response = await updatePassword({
        current_password: data.currentPassword,
        new_password: data.newPassword,
      });
      if (response.data?.status !== "success") {
        throw new Error(response.data?.message);
      } 
      toast.success(t(" update pssword success"));
      onOpenChange(false);
    } catch (error) {
      toast.error(t(" update pssword failed"));
    }
  }, [updatePassword, onOpenChange]);
  return (
    <MDialog
      open={open}
      onOpenChange={onOpenChange}
      description={t("setting.change_password.description")}
      header={t("setting.change_password.title")}
      content={
        <ChangePasswordForm
          onOpenChange={onOpenChange}
          onSave={(data) => {
            onSubmit(data);
          }}
          isLoading={isLoading}
        />
      }
    />
  );
}
