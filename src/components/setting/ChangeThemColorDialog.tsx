"use client";

import { useEffect, useState } from "react";
import MDialog from "../m-ui/m-dialog";
import { Sun, Moon, Palette } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { getLocalStorage, setLocalStorage } from "@/utils/storage";

interface ChangeThemColorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ChangeThemColorDialog({
  open,
  onOpenChange,
}: ChangeThemColorDialogProps) {
  const [switchTheme, setSwitchTheme] = useState(() => {
    const storedTheme = getLocalStorage("theme");
    return storedTheme ? storedTheme === "light" : true;
  });
  const [selectedColor, setSelectedColor] = useState(() => {
    const storedTheme = getLocalStorage("theme");
    return storedTheme || "light";
  });

  // Single useEffect to handle theme changes
  useEffect(() => {
    const theme = switchTheme ? "light" : "dark";
    setLocalStorage("theme", theme);
    document.body.classList.remove("light", "dark");
    document.body.classList.add(theme);
    setSelectedColor(theme);
  }, [switchTheme]);

  const themeOptions = [
    {
      id: "light",
      label: "Light",
      icon: Sun,
      color: "bg-white",
    },
    {
      id: "dark",
      label: "Dark",
      icon: Moon,
      color: "bg-black",
    },
  ];

  return (
    <MDialog
      className="w-full max-w-lg gap-6"
      header={
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
            <Palette className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Change Theme Color
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Customize your dashboard appearance
            </p>
          </div>
        </div>
      }
      content={
        <div className="space-y-8 py-2 ">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {switchTheme ? (
                <Sun className="w-5 h-5 text-amber-500" />
              ) : (
                <Moon className="w-5 h-5 text-slate-400" />
              )}
              <div>
                <h3 className="font-medium text-gray-900 dark:text-gray-100">
                  Appearance Mode
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Choose between light and dark theme
                </p>
              </div>
            </div>
            <Switch
              checked={switchTheme}
              onCheckedChange={setSwitchTheme}
              className="data-[state=checked]:bg-blue-500 cursor-pointer"
            />
          </div>

          {/* Theme Mode Cards */}
          <div className="grid grid-cols-2 gap-3">
            {themeOptions.map((theme) => (
              <div
                key={theme.id}
                className={`relative p-3 cursor-pointer rounded-lg border-2 transition-all duration-200 hover:scale-105 ${
                  selectedColor === theme.id
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-950"
                    : "border-gray-200 dark:border-gray-700 hover:border-gray-300"
                }`}
                onClick={() => setSwitchTheme(theme.id === "light")}
              >
                <div
                  className={`w-full h-16 rounded-md bg-gradient-to-br ${theme.color} mb-2`}
                />
                <div className="flex items-center justify-center gap-1">
                  <theme.icon className="w-3 h-3" />
                  <span className="text-xs font-medium">{theme.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      }
      open={open}
      onOpenChange={onOpenChange}
    />
  );
}
