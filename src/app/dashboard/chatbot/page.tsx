"use client";
import ChatContent from "@/components/chatbot/ChatContent";
import ChatBotForm from "@/components/chatbot/ChatBotForm";
import { Sparkles } from "lucide-react";

export default function ChatbotPage() {
  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex items-center gap-2">
        <Sparkles className="w-5 h-5 text-purple-600" />
        <span className="text-2xl font-bold"> ASK TO AI</span>
      </div>
      <div className="flex flex-col w-full justify-center items-center">
        <div className="flex  overflow-y-auto h-[calc(90vh-100px)] ">
          <ChatContent />
        </div>
      </div>
      <ChatBotForm />
    </div>
  );
}
