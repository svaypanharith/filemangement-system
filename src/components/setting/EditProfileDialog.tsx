"use client";
import MDialog from "@/components/m-ui/m-dialog";
import EditProfileForm from "./EditProfileForm";
import { useTranslation } from "react-i18next";

interface EditProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditProfileDialog({
  open,
  onOpenChange,
}: EditProfileDialogProps) {
  const { t } = useTranslation();
  return (
    <MDialog
      header={t("user_account.edit_profile")}
      description={t("user_account.edit_profile_description")}
      content={
        <EditProfileForm
          onCancel={() => onOpenChange(false)}
          onSave={() => onOpenChange(false)}
        />
      }
      open={open}
      onOpenChange={onOpenChange}
    />
  );
}
