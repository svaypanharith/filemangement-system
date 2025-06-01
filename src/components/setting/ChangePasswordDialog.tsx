"use client";

import MDialog from "@/components/m-ui/m-dialog";
import ChangePasswordForm from "@/components/auth/ChangePasswordForm";
import { useTranslation } from "react-i18next";

interface ChangePasswordDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ChangePasswordDialog({
  open,
  onOpenChange,
}: ChangePasswordDialogProps) {
  const { t } = useTranslation();
  return (
    <MDialog
      open={open}
      onOpenChange={onOpenChange}
      description={t("setting.change_password.description")}
      header={t("setting.change_password.title")}
      content={<ChangePasswordForm onOpenChange={onOpenChange} />}
    />
  );
}
