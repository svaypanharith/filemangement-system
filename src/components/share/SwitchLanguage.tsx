"use client";
import { switchAppLanguage } from "@/i18n/index";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

export default function SwitchLanguage() {
  const [currentLanguage, setCurrentLanguage] = useState<string>("en");

  const { t } = useTranslation();

  useEffect(() => {
    const storedLanguage = localStorage.getItem("language");
    if (storedLanguage) {
      setCurrentLanguage(storedLanguage);
    }
  }, []);

  const handleChangeLanguage = (value: string) => {
    switchAppLanguage(value);
    setCurrentLanguage(value);
  };

  return (
    <div>
      <Select value={currentLanguage} onValueChange={handleChangeLanguage}>
        <SelectTrigger className="cursor-pointer rounded-full shadow-xl">
          <div className="flex items-center gap-2">
            <SelectValue placeholder="Select a language" />
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="en">
            <div className="flex items-center gap-2">
              <Image
                src="/assets/icon/englishflag.png"
                alt="English"
                width={20}
                height={20}
              />
              {t("switchLanguage.English")}
            </div>
          </SelectItem>
          <SelectItem value="km">
            <div className="flex items-center gap-2">
              <Image
                src="/assets/icon/khmerflag.png"
                alt="Khmer"
                width={20}
                height={20}
              />
              {t("switchLanguage.Khmer")}
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
