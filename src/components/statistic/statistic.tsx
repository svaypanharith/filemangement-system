"use client";
import MCardStatistics from "../m-ui/m-card-statistics";
import { File, Sparkles, HardDrive } from "lucide-react";
import { useTranslation } from "react-i18next";
import BarChartComponent from "../share/bar-chart";
import { ChartConfig } from "../ui/chart";

export function Statistic() {
  const { t } = useTranslation();
  const data = [
    { month: "January", value: 400 },
    { month: "February", value: 300 },
    { month: "March", value: 200 },
    { month: "April", value: 100 },
    { month: "May", value: 50 },
    { month: "June", value: 0 },
  ];
  const config: ChartConfig = {
    label: { label: "value" },
  };
  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MCardStatistics
          title={t("dashboard.total_document")}
          value={30}
          icon={<File className="text-blue-900" />}
        />
        <MCardStatistics
          title={t("dashboard.total_file_size")}
          value={40}
          icon={<HardDrive className="text-blue-900" />}
        />
        <MCardStatistics
          title={t("dashboard.ai_credit")}
          value={20}
          icon={<Sparkles className="text-blue-900" />}
        />
        <MCardStatistics
          title={t("dashboard.total_ai_credit")}
          value={0}
          icon={<Sparkles className="text-blue-900" />}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
        <BarChartComponent
          config={config}
          dataKey="value"
          data={data}
          color="blue"
          radius={8}
        />
      </div>
    </div>
  );
}
