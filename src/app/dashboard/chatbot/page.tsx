"use client";
import { ChatBot } from "@/components/chatbot/ChatBot";
import { useTranslation } from "react-i18next";
import { useMemo } from "react";

export default function ChatbotPage() {
  const { t } = useTranslation();
  
  return useMemo(() => (
    <div className="flex flex-col gap-2 w-full h-[calc(100vh-100px)]">
      <ChatBot  />
    </div>
  ), [t]);
}
