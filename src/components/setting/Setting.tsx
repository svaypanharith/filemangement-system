"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Moon, Sun, Bell, Shield, User, Lock, LogOut } from "lucide-react";
import { useState } from "react";
import ChangePasswordDialog from "@/components/setting/ChangePasswordDialog";
import UserAccountDialog from "@/components/setting/UserAccountDialog";
import { useTranslation } from "react-i18next";
import LogoutDialog from "@/components/dashboard/logout";
import { useHydration } from "@/hooks/useHydration";

const CardWrapper = ({
  onClick,
  title,
  icon,
  description,
}: {
  onClick: () => void;
  title: string;
  icon: React.ReactNode;
  description: string;
}) => {
  return (
    <Card className="cursor-pointer" onClick={onClick}>
      <CardHeader>
        <div className="flex items-center gap-2 cursor-pointer">
          {icon}
          <CardTitle>{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription>{description}</CardDescription>
      </CardContent>
    </Card>
  );
};

export default function Setting() {
  const [darkMode, setDarkMode] = useState(false);
  const [isOpenChangePassword, setIsOpenChangePassword] = useState(false);
  const [isOpenUserAccountDialog, setIsOpenUserAccountDialog] = useState(false);
  const [isOpenLogoutDialog, setIsOpenLogoutDialog] = useState(false);
  const { t } = useTranslation();
  return (
    <>
      <div className="container mx-auto p-6 space-y-8">
        <div className="grid gap-6">
          {/* Language Settings */}

          <CardWrapper
            title={t("setting.user_account")}
            icon={<User className="w-5 h-5 text-blue-500" />}
            description="Manage your account settings"
            onClick={() => setIsOpenUserAccountDialog(true)}
          />

          {/* change password */}
          <CardWrapper
            title={t("setting.change_password")}
            icon={<Lock className="w-5 h-5 text-blue-500" />}
            description="Change your password to secure your account"
            onClick={() => setIsOpenChangePassword(true)}
          />

          {/* Appearance Settings */}
          <CardWrapper
            title={t("setting.appearance")}
            icon={<Sun className="w-5 h-5 text-yellow-500" />}
            description="Manage your appearance settings"
            onClick={() => {}}
          />

          {/* Notification Settings */}
          <CardWrapper
            title={t("setting.notifications")}
            icon={<Bell className="w-5 h-5 text-blue-500" />}
            description="Manage your notification preferences"
            onClick={() => {}}
          />

          {/* Privacy Settings */}
          <CardWrapper
            title={t("setting.privacy")}
            icon={<Shield className="w-5 h-5 text-blue-500" />}
            description="Manage your privacy settings"
            onClick={() => {}}
          />

          {/* logout */}
          <CardWrapper
            title={t("setting.logout")}
            icon={<LogOut className="w-5 h-5 text-red-500" />}
            description="Logout from your account"
            onClick={() => setIsOpenLogoutDialog(true)}
          />
        </div>
      </div>

      <ChangePasswordDialog
        open={isOpenChangePassword}
        onOpenChange={setIsOpenChangePassword}
      />
      <UserAccountDialog
        open={isOpenUserAccountDialog}
        onOpenChange={setIsOpenUserAccountDialog}
      />
      <LogoutDialog
        open={isOpenLogoutDialog}
        onOpenChange={setIsOpenLogoutDialog}
      />
    </>
  );
}
