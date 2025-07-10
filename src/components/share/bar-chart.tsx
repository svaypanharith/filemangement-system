"use client";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { useTheme } from "next-themes";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface BarChartData {
  timerange: string;
  document: number;
}

interface BarChartProps {
  data?: BarChartData[];
  config: ChartConfig;
  dataKey: string;
  color?: string;
  radius?: number;
  fill?: string;
  title?: string;
}

export default function BarChartComponent({
  data,
  config,
  color = "#3b82f6",
  title,
}: BarChartProps) {
 const { resolvedTheme } = useTheme();  
  return (
    <Card className={`w-full max-w-4xl mx-auto shadow-lg border-0 ${resolvedTheme === "dark" ? "bg-black" : "bg-white"}`}>
      <CardHeader className="text-left">
        <CardTitle className="text-lg font-semibold text-gray-800">
          {title}
        </CardTitle>
        <CardDescription className="text-sm text-gray-500 mt-1">
          {new Date().toLocaleDateString("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="w-full">
          <ChartContainer 
            config={config} 
            className="w-full"
          >
              <BarChart
                data={data}
                margin={{
                  top: 10,
                  right: 40,
                }}
              >
                <CartesianGrid 
                  strokeDasharray="3 3" 
                  stroke="#e5e7eb"
                  vertical={false}
                />
               <XAxis
              dataKey="timerange"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tick={{
                fontSize:12,
                fontWeight: "medium",
                fill: "#6b7280",
              }}
              textAnchor="end"
              interval="preserveEnd"
              tickFormatter={(value) => value.toString()}
            />
<YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              tick={{
                fontSize: 12,
                fontWeight: "medium",
                fill: "#6b7280",
              }}
              allowDecimals={false}
              tickFormatter={(value) => Math.round(value).toLocaleString()}
              interval={0}
            />
                <ChartTooltip
                  cursor={{ fill: "rgba(59, 130, 246, 0.1)" }}
                  content={<ChartTooltipContent indicator="dashed" />}
                />
                <Bar
                  dataKey="document"
                  fill={color}
                  radius={10}
                  maxBarSize={30}
                />
              </BarChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
}