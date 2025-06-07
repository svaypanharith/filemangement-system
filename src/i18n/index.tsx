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

// Simple initialization - no localStorage checks at all
if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources,
    lng: "en", // Always English
    fallbackLng: "en",
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

// Called automatically by LanguageProvider after hydration
export const loadUserLanguage = () => {
  if (typeof window !== "undefined") {
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage && savedLanguage !== i18n.language) {
      switchAppLanguage(savedLanguage);
    }
  }
};
