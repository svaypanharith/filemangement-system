"use client";

import { useTranslation } from "react-i18next";
import MAlertDialog from "../m-ui/m-alert-dilog";

type LogoutDialogProps = {
  open: boolean;
  onOpenChange?: (open: boolean) => void;
  onSuccess?: () => void;
};

const LogoutDialog = ({ open, onOpenChange, onSuccess }: LogoutDialogProps) => {
  const { t } = useTranslation("home");

  const handleLogout = () => {
    if (onSuccess) {
      onSuccess();
    }
  };

  return (
    <MAlertDialog
      preset="destructive"
      open={open}
      onOpenChange={onOpenChange}
      title={"Logout"}
      description={"Are you sure you want to logout?"}
      onConfirm={handleLogout}
      onCancel={() => onOpenChange?.(false)}
      cancelText={"Cancel"}
      confirmText={"Logout"}
    />
  );
};

export default LogoutDialog;
