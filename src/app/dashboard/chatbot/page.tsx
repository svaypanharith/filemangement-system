"use client";
import { ChatBot } from "@/components/chatbot/ChatBot";
import { useTranslation } from "react-i18next";
import { useMemo, Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

function ChatbotContent() {
  const { t } = useTranslation();
  
  return useMemo(() => (
    <div className="flex flex-col gap-2 w-full h-[calc(100vh-100px)]">
      <ChatBot />
    </div>
  ), [t]);
}

export default function ChatbotPage() {
  return (
    <Suspense fallback={
      <div className="flex flex-col gap-2 w-full h-[calc(100vh-100px)] p-4">
        <Skeleton className="h-4 w-[200px]" />
        <Skeleton className="h-10 w-full mt-4" />
        <Skeleton className="h-32 w-full mt-4" />
      </div>
    }>
      <ChatbotContent />
    </Suspense>
  );
}
