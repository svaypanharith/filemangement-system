"use client";
import Chatbot from "@/components/chatbot/ChatBot";
import { Sparkles } from "lucide-react";

export default function ChatbotPage() {
  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-2">
        <Sparkles className="w-5 h-5 text-purple-600" />
        <span className="text-2xl font-bold"> ASK TO AI</span>
      </div>
      <Chatbot />
    </div>
  );
}
