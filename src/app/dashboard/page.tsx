"use client";
import { Statistic } from "@/components/statistic/statistic";
import { useTranslation } from "react-i18next";
import { LayoutDashboard } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSidebarTrigger } from "@/redux/slices/sidebartrigger-slice";
import { useEffect } from "react";

export default function Dashboard() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setSidebarTrigger({ text: t("dashboard.dashboard"), iconName: "layout-dashboard" }));
  }, [t, dispatch]);

  return (
    <div className="flex flex-col gap-8">
      <Statistic />
    </div>
  );
}
