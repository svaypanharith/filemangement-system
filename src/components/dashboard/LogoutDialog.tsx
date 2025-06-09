"use client";

import { useTranslation } from "react-i18next";
import MAlertDialog from "../m-ui/m-alert-dialog";
import { useRouter } from "next/navigation";
import Dialog from "../m-ui/m-dialog";
import { Button } from "../ui/button";

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
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
      header={t("logout.logout")}
      description={t("logout.logout_description")}
      footer={
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange?.(false)}>
            {t("logout.cancel")}
          </Button>
          <Button variant="destructive" onClick={handleLogout}>
            {t("logout.logout")}
          </Button>
        </div>
      }
    />
  );
};

export default LogoutDialog;
