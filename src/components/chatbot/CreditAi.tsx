"use client";
import { Card } from "@/components/ui/card";
import { Sparkles } from "lucide-react";
import { useState, useEffect } from "react";

const AnimationNumber = ({ value }: { value: number }) => {
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    let startValue = 0;
    const duration = 1000;
    const steps = 25;
    const increment = value / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      startValue += increment;

      if (currentStep === steps) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(startValue));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [value]);

  return displayValue;
};

export default function AICredit() {
  return (
    <Card className="flex  justify-between bg-gradient-to-r from-purple-50 to-blue-50 border-none shadow-sm hover:shadow-md transition-all duration-300 rounded-xl w-full p-4 shadow-lg">
      <div className="flex gap-2 min-w-0">
        <div className="flex-shrink-0">
          <Sparkles className="w-5 h-5 text-purple-600" />
        </div>
        <span className="font-medium text-gray-700 truncate">AI Credit</span>
      </div>
      <div className="flex items-center justify-center">
        <span className="text-2xl font-bold">
          <AnimationNumber value={20} />
        </span>
      </div>
    </Card>
  );
}
