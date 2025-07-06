"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useMemo } from "react";
import { Sun, Shield, User, Lock, LogOut, Settings } from "lucide-react";
import { useState } from "react";
import ChangeThemColorDialog from "@/components/setting/ChangeThemColorDialog";
import ChangePasswordDialog from "@/components/setting/ChangePasswordDialog";
import UserAccountDialog from "@/components/setting/UserAccountDialog";
import { useTranslation } from "react-i18next";
import LogoutDialog from "@/components/dashboard/LogoutDialog";
import { useDispatch } from "react-redux";
import { setSidebarTrigger } from "@/redux/slices/sidebartrigger-slice";

const CardWrapper = ({
  onClick,
  title,
  icon,
  description,
}: {
  onClick?: () => void;
  title?: string;
  icon?: React.ReactNode;
  description?: string;
}) => {
  return (
    <Card className={`cursor-pointer shadow-md`} onClick={onClick}>
      <CardHeader>
        <div className="flex items-center gap-2 cursor-pointer">
          {icon}
          <CardTitle>
            <span className="text-xl font-bold">{title}</span>
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription>
          <span className="text-lg text-gray-500">{description}</span>
        </CardDescription>
      </CardContent>
    </Card>
  );
};

export default function Setting() {
  // const [darkMode, setDarkMode] = useState(false);
  const [isOpenChangePassword, setIsOpenChangePassword] = useState(false);
  const [isOpenUserAccountDialog, setIsOpenUserAccountDialog] = useState(false);
  const [isOpenLogoutDialog, setIsOpenLogoutDialog] = useState(false);
  const [isOpenChangeThemeColorDialog, setIsOpenChangeThemeColorDialog] =
    useState(false);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setSidebarTrigger({ text: t("setting.setting"), iconName: "settings" }));
  }, [t, dispatch]);
  return useMemo(
    () => (
      <>
        <div className="grid gap-6 ">
          {/* Language Settings */}
          <CardWrapper
            title={t("setting.user_account")}
            icon={<User className="w-5 h-5 text-blue-500" />}
            description={t("setting.user_account")}
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
            title={t("setting.theme.title")}
            icon={<Sun className="w-5 h-5 text-yellow-500" />}
            description={t("setting.theme.description")}
            onClick={() => setIsOpenChangeThemeColorDialog(true)}
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
        <ChangeThemColorDialog
          open={isOpenChangeThemeColorDialog}
          onOpenChange={setIsOpenChangeThemeColorDialog}
        />
      </>
    ),
    [
      isOpenChangePassword,
      isOpenUserAccountDialog,
      isOpenLogoutDialog,
      isOpenChangeThemeColorDialog,
      t,
    ]
  );
}
