"use client";
import MInput from "../m-ui/m-input";
import ChatContent from "./ChatContent";
import { Button } from "../ui/button";
export default function Chatbot() {
  return (
    <div className="flex flex-col h-full ">
      <div className="flex items-center justify-center  h-[calc(90vh-100px)]">
        <ChatContent />
      </div>
      <div className="w-full max-w-6xl mx-auto mt-auto relative">
        <MInput className="rounded-full" placeholder="Ask me anything" />
        <div className="absolute bottom-3 right-3">
          <Button className="bg-blue-500 text-white rounded-full hover:bg-blue-600">
            send
          </Button>
        </div>
      </div>
    </div>
  );
}
