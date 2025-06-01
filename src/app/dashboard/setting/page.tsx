"use client";
import Setting from "@/components/setting/Setting";
import { Settings } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useHydration } from "@/hooks/useHydration";

export default function SettingPage() {
  const { t } = useTranslation();
  const isHydrated = useHydration();
  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-2">
        <Settings className="w-5 h-5" />
        <p className="text-2xl font-bold">
          {isHydrated ? t("setting.setting") : "Settings"}
        </p>
      </div>
      <Setting />
    </div>
  );
}
