"use client";

import { useTranslation } from "react-i18next";
import MAlertDialog from "../m-ui/m-alert-dialog";
import { useRouter } from "next/navigation";

type LogoutDialogProps = {
  open: boolean;
  onOpenChange?: (open: boolean) => void;
  onSuccess?: () => void;
};

const LogoutDialog = ({ open, onOpenChange, onSuccess }: LogoutDialogProps) => {
  const { t } = useTranslation("");
  const router = useRouter();

  const handleLogout = () => {
    router.push("/welcome");
    if (onSuccess) {
      onSuccess();
    }
  };

  return (
    <MAlertDialog
      preset="destructive"
      open={open}
      onOpenChange={onOpenChange}
      title={t("logout.logout")}
      description={t("logout.logout_description")}
      onConfirm={handleLogout}
      onCancel={() => onOpenChange?.(false)}
      cancelText={t("logout.cancel")}
      confirmText={t("logout.logout")}
    />
  );
};

export default LogoutDialog;
