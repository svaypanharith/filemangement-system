"use client";

import { useCallback, useEffect, useState } from "react";
import MDialog from "../m-ui/m-dialog";
import { Sun, Moon, Palette } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import toast from "react-hot-toast";
import { useTheme } from "next-themes";
import { useTranslation } from "react-i18next";

interface ChangeThemColorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ChangeThemColorDialog({
  open,
  onOpenChange,
}: ChangeThemColorDialogProps) {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const [switchTheme, setSwitchTheme] = useState(
    resolvedTheme === "dark" ? true : false
  );

  const [selectedColor, setSelectedColor] = useState(() => {
    return resolvedTheme === "dark" ? "dark" : "light";
  });

  const { t } = useTranslation();

  const handleThemeChange = useCallback(
    (isDark: boolean) => {
      if (isDark) {
        setSwitchTheme(true);
        setTheme("dark");
        toast.success("Theme changed to dark", {
          style: {
            background: "#000",
            color: "#fff",
          },
        });
      } else {
        setSwitchTheme(false);
        setTheme("light");
        toast.success("Theme changed to light", {
          style: {
            background: "#fff",
            color: "#000",
          },
        });
      }

      setSelectedColor(isDark ? "dark" : "light");
    },
    [setTheme]
  );

  const themeOptions = [
    {
      id: "light",
      label: t("setting.theme.light"),
      icon: Sun,
      color: "bg-white",
    },
    {
      id: "dark",
      label: t("setting.theme.dark"),
      icon: Moon,
      color: "bg-black",
    },
  ];

  // Prevent hydration mismatch
  if (!mounted) return null;

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
              {t("setting.theme.title")}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {t("setting.theme.description")}
            </p>
          </div>
        </div>
      }
      content={
        <div className="space-y-8 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {switchTheme ? (
                <Moon className="w-5 h-5 text-slate-400" />
              ) : (
                <Sun className="w-5 h-5 text-amber-500" />
              )}
              <div>
                <h3 className="font-medium text-gray-900 dark:text-gray-100">
                  {t("setting.theme.appearance_mode")}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {t("setting.theme.appearance_mode_description")}
                </p>
              </div>
            </div>
            <Switch
              checked={switchTheme}
              onCheckedChange={(checked) => handleThemeChange(checked)}
              className="data-[state=checked]:bg-blue-500 cursor-pointer"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {themeOptions.map((theme) => (
              <div
                key={theme.id}
                className={`relative p-3 cursor-pointer rounded-lg border-2 transition-all duration-200 hover:scale-105 ${
                  selectedColor === theme.id
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-950"
                    : "border-gray-200 dark:border-gray-700 hover:border-gray-300"
                }`}
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
