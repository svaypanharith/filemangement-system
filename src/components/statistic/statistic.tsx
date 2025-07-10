"use client";
import MCardStatistics from "../m-ui/m-card-statistics";
import { File, Sparkles, HardDrive, Activity } from "lucide-react";
import { useTranslation } from "react-i18next";
import BarChartComponent from "../share/bar-chart";
import { ChartConfig } from "../ui/chart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useGetDocumentAggregateQuery,
  useGetFileSizeAggregateQuery,
  useGetWeeklyAggregateQuery,
  useGetMonthlyAggregateQuery,
  useGetYearlyAggregateQuery,
  useGetDailyAggregateQuery,

} from "@/redux/slices/data-slice";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

interface BarChartData {
  timerange: string;
  document: number;
}

export function Statistic() {
  const { t } = useTranslation();
  const { data: statistic } = useGetDocumentAggregateQuery();
  const { data: fileSize } = useGetFileSizeAggregateQuery();
  const { data: dailyAggregate } = useGetDailyAggregateQuery();
  const { data: weeklyAggregate } = useGetWeeklyAggregateQuery();
  const { data: monthlyAggregate } = useGetMonthlyAggregateQuery();
  const { data: yearlyAggregate } = useGetYearlyAggregateQuery();
  const { resolvedTheme } = useTheme();

const [data, setData] = useState<BarChartData[]>([]);
  const [isSelected, setIsSelected] = useState<string>("daily");

  useEffect(() => {
   switch(isSelected){
    case "daily":
      setData(dailyAggregate?.dailyDocumentCount || [])
      break;
    case "weekly":
      setData(weeklyAggregate?.weeklyDocumentCount || [])
      break;
    case "monthly":
      setData(monthlyAggregate?.monthlyDocumentCount || [])
      break;
    case "yearly":
      setData(yearlyAggregate?.yearlyDocumentCount || [])
   }
  }, [isSelected, dailyAggregate, weeklyAggregate, monthlyAggregate, yearlyAggregate]);


  const tabs = [
    {
      label: t("dashboard.statistics.daily"),
      value: "daily",
    },
    {
      label: t("dashboard.statistics.weekly"),
      value: "weekly",
    },
    {
      label: t("dashboard.statistics.monthly"),
      value: "monthly",
    },
    {
      label: t("dashboard.statistics.yearly"),
      value: "yearly",
    },
  ];

  const fileSizeValue = fileSize?.totalFileSize.toString().slice(0, 6) || 0;
  const config: ChartConfig = {
    label: { label: "value" },
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <MCardStatistics
          title={t("dashboard.total_document")}
          value={statistic?.totalDocuments || 0}
          icon={<File className="text-blue-600" />}
        />
        <MCardStatistics
          title={t("dashboard.total_file_size")}
          value={fileSizeValue as number}
          unit="KB"
          icon={<HardDrive className="text-green-600" />}
        />
        <MCardStatistics
          title={t("dashboard.ai_credit")}
          value={20}
          icon={<Sparkles className="text-purple-600" />}
        />
        <MCardStatistics
          title={t("dashboard.ai_used_credit")}
          value={0}
          icon={<Activity className="text-orange-600" />}
        />
      </div>

      <div className={`rounded-2xl p-8 shadow-xl border border-gray-100 ${resolvedTheme === "dark" ? "bg-black" : "bg-white"}`}>
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            {t("dashboard.statistics.monitor")}
          </h2>
          <p className="text-sm text-gray-600">
            {t("dashboard.statistics.track_your_document")}
          </p>
        </div>

        <Tabs defaultValue={isSelected} className="w-full flex flex-col gap-4">
          <TabsList className={`grid w-full grid-cols-4 cursor-pointer ${resolvedTheme === "dark" ? "bg-black" : "bg-gray-100"} p-1 rounded-xl`}>
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                onClick={() => setIsSelected(tab.value)}
                className="data-[state=active]:bg-white  cursor-pointer data-[state=active]:text-gray-900 data-[state=active]:shadow-sm rounded-lg transition-all duration-200"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent value={isSelected} className="mt-8 w-full">
            <div className="flex flex-row gap-4 w-full ">
              <div className={`${resolvedTheme === "dark" ? "bg-black" : "bg-gradient-to-br w-full from-blue-50 to-blue-100"}   
              rounded-2xl p-6 border border-blue-200 w-full`}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-blue-600 rounded-lg">
                    <File className="text-white h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {t("dashboard.statistics.document_transaction")}
                  </h3>
                </div>
                <BarChartComponent
                  config={config}
                  dataKey="document"
                  data={data}
                  color="blue"
                  radius={8}
                  title={t("dashboard.document_transaction")}
                />
                </div>
                <div className={`${resolvedTheme === "dark" ? "bg-black" : "bg-gradient-to-br w-full from-purple-50 to-purple-100"} rounded-2xl p-6 border border-purple-200 w-full`}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-purple-600 rounded-lg">
                    <Sparkles className="text-white h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    AI Transaction
                  </h3>
                </div>
                <BarChartComponent
                  config={config}
                  dataKey="document"
                  data={data}
                  color="purple"
                  radius={8}
                  title={t("dashboard.ai_used_credit")}
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
