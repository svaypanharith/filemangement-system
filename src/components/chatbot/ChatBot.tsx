"use client";
import ChatContent from "@/components/chatbot/ChatContent";
import ChatBotForm from "@/components/chatbot/ChatBotForm";

export default function Chatbot() {
  return (
    <div className="flex flex-col items-center justify-center gap-16 h-full bg-transparent from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="flex items-center justify-center h-autoPP w-full bg-red-500">
        <ChatContent />
      </div>
      <div className="flex items-center justify-center h-auto w-full">
        <ChatBotForm />
      </div>
    </div>
  );
}
