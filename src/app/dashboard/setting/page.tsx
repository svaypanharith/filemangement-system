"use client";
import Setting from "@/components/setting/Setting";
import { useTranslation } from "react-i18next";

export default function SettingPage() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-6">
      {/* <div className="flex items-center gap-2">
        <Settings className="w-5 h-5" />
        <p className="text-2xl font-bold">{t("setting.setting")}</p>
      </div> */}
      <div className="w-full">
        <Setting />
      </div>
    </div>
  );
}
