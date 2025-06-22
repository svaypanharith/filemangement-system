"use client";
import { Statistic } from "@/components/statistic/statistic";
import { useTranslation } from "react-i18next";
import { LayoutDashboard } from "lucide-react";

export default function Dashboard() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center gap-4">
        <LayoutDashboard className="w-6 h-6" />
        <h1 className="text-2xl font-bold">{t("dashboard.dashboard")}</h1>
      </div>
      <Statistic />
    </div>
  );
}
