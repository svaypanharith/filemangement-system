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
    <Card
      className="cursor-pointer hover:bg-gray-100 shadow-md"
      onClick={onClick}
    >
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
      <div className="grid gap-6 ">
        {/* Language Settings */}
        <CardWrapper
          title={t("setting.user_account")}
          icon={<User className="w-5 h-5 text-blue-500" />}
          description="Manage your account settings"
          onClick={() => setIsOpenUserAccountDialog(true)}
        />

        {/* change password */}
        <CardWrapper
          title={t("setting.change_password.title")}
          icon={<Lock className="w-5 h-5 text-blue-500" />}
          description={t("setting.change_password.description")}
          onClick={() => setIsOpenChangePassword(true)}
        />

        {/* Appearance Settings */}
        <CardWrapper
          title={"Theme"}
          icon={<Sun className="w-5 h-5 text-yellow-500" />}
          description="Change the theme of the app"
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
          description={t("setting.logout_description")}
          onClick={() => setIsOpenLogoutDialog(true)}
        />
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
