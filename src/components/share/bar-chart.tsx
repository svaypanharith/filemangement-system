"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { TrendingUp } from "lucide-react";

interface BarChartData {
  month: string;
  value: number;
}
interface BarChartProps {
  data?: BarChartData[];
  config: ChartConfig;
  dataKey: string;
  color?: string;
  radius?: number;
  fill?: string;
}

export default function BarChartComponent({
  data,
  config,
  dataKey,
  color,
  radius,
  fill,
}: BarChartProps) {
  return (
    <Card className="w-full shadow-xl">
      <CardHeader>
        <CardTitle> Chart Document</CardTitle>
        <CardDescription>
          <span className="text-sm text-muted-foreground">
            {new Date().toLocaleDateString("en-US", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={config} className="w-full">
          <BarChart
            accessibilityLayer
            data={data}
            margin={{
              top: 20,
              right: 0,
              left: 0,
              bottom: 5,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={20}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar
              dataKey={dataKey}
              fill={color}
              radius={radius}
              barSize={50}
              calcMode="linear"
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
