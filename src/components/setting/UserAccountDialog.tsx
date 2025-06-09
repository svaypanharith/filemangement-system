"use client";

import MDialog from "@/components/m-ui/m-dialog";
import UserAccountDetail from "@/components/profiles/UserAccountDetail";
import { useTranslation } from "react-i18next";
import { EditProfileDialog } from "./EditProfileDialog";
import { useState } from "react";
interface UserAccountDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function UserAccountDialog({
  open,
  onOpenChange,
}: UserAccountDialogProps) {
  const { t } = useTranslation();
  const [openEditProfileDialog, setOpenEditProfileDialog] = useState(false);
  return (
    <>
      <MDialog
        className="w-full max-w-md"
        header={t("setting.user_account")}
        content={
          <div className="w-full mx-auto">
            <UserAccountDetail
              onOpenEditProfileDialog={() => {
                setOpenEditProfileDialog(true);
                onOpenChange(false);
              }}
            />
          </div>
        }
        open={open}
        onOpenChange={onOpenChange}
      />
      <EditProfileDialog
        open={openEditProfileDialog}
        onOpenChange={setOpenEditProfileDialog}
      />
    </>
  );
}
