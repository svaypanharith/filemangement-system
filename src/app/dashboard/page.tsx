"use client";
import { Statistic } from "@/components/statistic/statistic";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const { t, i18n } = useTranslation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Only render the translated content after mounting to avoid hydration mismatch
  if (!mounted) {
    return (
      <div className="flex flex-col gap-8">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <Statistic />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-2xl font-bold">{t("dashboard.dashboard")}</h1>
      <Statistic />
    </div>
  );
}
