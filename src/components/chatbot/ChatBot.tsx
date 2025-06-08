"use client";
import { Textarea } from "../ui/textarea";
import ChatContent from "./ChatContent";
import { Button } from "../ui/button";
import { Send } from "lucide-react";
import { Input } from "../ui/input";
export default function Chatbot() {
  return (
    <div className="flex flex-col h-full ">
      <div className="flex items-center justify-center  h-[calc(90vh-100px)]">
        <ChatContent />
      </div>
      <div className="w-full max-w-6xl p-2 mx-auto mt-auto relative">
        <Textarea
          className="rounded-2xl p-6 w-full"
          placeholder="Ask me anything"
          rows={10}
        />
        <div className="absolute bottom-4 right-4 z-100 ">
          <Button className="bg-blue-500 text-white cursor-pointer rounded-full hover:bg-blue-600">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
