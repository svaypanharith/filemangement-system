"use client";

import { useEffect } from "react";
import { loadUserLanguage } from "@/i18n";

export default function LoadLanguageProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    loadUserLanguage();
  }, []);

  return <>{children}</>;
}
