"use client";

import Document from "@/components/document/Document";
import { useTranslation } from "react-i18next";
export default function DocumentPage() {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-10  ">
      <Document />
    </div>
  );
}
