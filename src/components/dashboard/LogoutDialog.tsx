"use client";

import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import Dialog from "../m-ui/m-dialog";
import MButton from "../m-ui/m-button";
import { useAuth } from "@/provider/AuthProvider";
import { useSignOutMutation } from "@/redux/slices/auth-slice";

type LogoutDialogProps = {
  open: boolean;
  onOpenChange?: (open: boolean) => void;
  onSuccess?: () => void;
};

const LogoutDialog = ({ open, onOpenChange, onSuccess }: LogoutDialogProps) => {
  const { t } = useTranslation("");
  const { logout } = useAuth();
  const [signOut, { isLoading }] = useSignOutMutation();

  const handleLogout = async () => {
    try {
      logout();
      window.location.href = "/";
    } catch (error: any) {
      console.error("Logout error:", error);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
      header={t("logout.logout")}
      description={t("logout.logout_description")}
      footer={
        <div className="flex justify-end gap-2">
          <MButton preset="secondary" onClick={() => onOpenChange?.(false)}>
            {t("logout.cancel")}
          </MButton>
          <MButton
            preset="danger"
            onClick={handleLogout}
            disabled={isLoading}
            loading={isLoading}
          >
            {t("logout.logout")}
          </MButton>
        </div>
      }
    />
  );
};

export default LogoutDialog;