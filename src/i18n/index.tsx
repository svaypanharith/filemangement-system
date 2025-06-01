"use client";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
import km from "./locales/km.json";

const resources = {
  en: {
    translation: en,
  },
  km: {
    translation: km,
  },
};

// Check if i18n is already initialized
if (!i18n.isInitialized) {
  const defaultLanguage = "en";
  const savedLanguage =
    typeof window !== "undefined" ? localStorage.getItem("language") : null;

  i18n.use(initReactI18next).init({
    resources,
    lng: savedLanguage || defaultLanguage,
    fallbackLng: defaultLanguage,
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });
}

export default i18n;

export const switchAppLanguage = (lng: string) => {
  try {
    i18n.changeLanguage(lng);
    if (typeof window !== "undefined") {
      localStorage.setItem("language", lng);
    }
  } catch (error) {
    console.error("Error changing language:", error);
  }
};
