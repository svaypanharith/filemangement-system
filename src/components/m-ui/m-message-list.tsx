// import { CopyIcon } from "lucide-react";
import { Message } from "../ui/chat-message";
import { ChatMessage } from "../ui/chat-message";
import { CopyButton } from "../ui/copy-button";
// import { useTranslation } from "react-i18next";
import { Chat } from "../ui/chat";

interface MMessageListProps {
  messages: Message[];
}

export default function MMessageList({ messages }: MMessageListProps) {

  return (
    <div>
      {messages.map((message) => (
        <Chat 
          key={message.id} 
          messages={messages}
          handleSubmit={() => {}}
          input={""}
          handleInputChange={() => {}}
          isGenerating={false}
          append={() => {}}
          suggestions={[]}
          className="w-full"
        />
      ))}
    </div>
  );
}