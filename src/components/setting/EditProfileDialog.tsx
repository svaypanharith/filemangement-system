"use client";
import MDialog from "@/components/m-ui/m-dialog";
import EditProfileForm from "./EditProfileForm";
import { useTranslation } from "react-i18next";

import { useUpdateProfileMutation } from "@/redux/slices/data-slice";
import { useCallback } from "react";
import { toast } from "react-hot-toast";

export interface User {
  id: string;
  username: string;
  first_name: string;
  last_name: string;
}

interface EditProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData: User;
}

export function EditProfileDialog({
  open,
  onOpenChange,
  initialData,
}: EditProfileDialogProps) {
  const { t } = useTranslation();
  const [updateProfileMutation, { isLoading }] = useUpdateProfileMutation();
  const handleUpdateProfile = useCallback(
    (data: { first_name: string; last_name: string; username: string }) => {
      try {
        updateProfileMutation({
          username: data.username,
          first_name: data.first_name,
          last_name: data.last_name,
        });
        toast.success(t("user_account.edit_profile_success"));
        setTimeout(() => {
          onOpenChange(false);
        }, 1000);
      } catch (error) {
        console.error("Error updating profile:", error);
      }
    },
    [updateProfileMutation, onOpenChange]
  );
  return (
    <MDialog
      header={t("user_account.edit_profile")}
      description={t("user_account.edit_profile_description")}
      content={
        <EditProfileForm
          isLoading={isLoading}
          initialData={initialData}
          onCancel={() => onOpenChange(false)}
          onSave={(data) => {
            handleUpdateProfile({
              first_name: data.first_name,
              last_name: data.last_name,
              username: data.username,
            });
            onOpenChange(false);
          }}
        />
      }
      open={open}
      onOpenChange={onOpenChange}
    />
  );
}
