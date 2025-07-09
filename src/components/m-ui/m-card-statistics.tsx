"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { TrendingUp } from "lucide-react";

interface MCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  unit?: string;
}

export default function MCardStatistics({
  title,
  value,
  icon,
  unit,
}: MCardProps) {
  const AnimationNumber = ({ value }: { value: number }) => {
    const [displayValue, setDisplayValue] = useState(0);

    // useEffect(() => {
    //   let startValue = 0;
    //   const duration = 1000;
    //   const steps = 25;
    //   const increment = value / steps;
    //   let currentStep = 0;

    //   const timer = setInterval(() => {
    //     currentStep++;
    //     startValue += increment;

    //     if (currentStep === steps) {
    //       setDisplayValue(value);
    //       clearInterval(timer);
    //     } else {
    //       setDisplayValue(Math.floor(startValue));
    //     }
    //   }, duration / steps);
    //   return () => clearInterval(timer);
    // }, [value]);

    return displayValue;
  };
  return (
    <Card className="transition-all hover:shadow-lg hover:-translate-y-1 shadow-xl cursor-pointer">
      <CardHeader className="pb-2">
        <CardTitle className="text-muted-foreground text-sm">
          <span className="bg-blue-500/10 rounded-full p-4">{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <p className="text-4xl font-bold text-primary flex items-center gap-6">
            {value}
            {unit ? (
              <span className="text-muted-foreground text-sm">{unit}</span>
            ) : (
              <TrendingUp className="text-green-500" />
            )}
            
          </p>
          <div className="rounded-full bg-blue-500/10 p-3">{icon}</div>
        </div>
      </CardContent>
    </Card>
  );
}
