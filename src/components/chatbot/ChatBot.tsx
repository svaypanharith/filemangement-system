"use client";

import { useState, useEffect } from "react";
import { useGetChatMutation } from "@/redux/slices/data-slice";
import { setLocalStorage, getLocalStorage } from "@/utils/storage";
import { Chat } from "@/components/ui/chat";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { setSidebarTrigger } from "@/redux/slices/sidebartrigger-slice";
import { Message } from "@/components/ui/chat-message";

export function ChatBot() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [getChat, { isLoading: isLoadingChat }] = useGetChatMutation();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const user_id = "1";
  useEffect(() => {
    dispatch(
      setSidebarTrigger({ text: t("chatbot.ask_to_ai"), iconName: "sparkles" })
    );
  }, [dispatch, t]);

  useEffect(() => {
    const chatHistoryStorage = getLocalStorage("chat_history");
    if (!chatHistoryStorage) return;

    try {
      const chatHistory = JSON.parse(chatHistoryStorage);
      if (Array.isArray(chatHistory) && chatHistory.length > 0) {
        const historyMessages: Message[] = chatHistory.flatMap(
          (item: any, index: number) => [
            {
              id: `user-${item.session_id}-${index}`,
              role: "user" as const,
              content: item.user_message,
              createdAt: new Date(item.timestamp),
            },
            {
              id: `assistant-${item.session_id}-${index}`,
              role: "assistant" as const,
              content: item.ai_response,
              createdAt: new Date(item.timestamp),
            },
          ]
        );
        setMessages(historyMessages);
      }
    } catch (error) {
      console.error("Error parsing chat history:", error);
    }
  }, []);

  // Handle new messages from props

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async (
    event?: { preventDefault?: () => void },
    options?: { experimental_attachments?: FileList }
  ) => {
    event?.preventDefault?.();
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: inputValue,
      createdAt: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsGenerating(true);

    try {
      const response = await getChat({
        user_id,
        user_message: inputValue,
        start_session: true,
        status: "pending",
      });

      const aiResponse = response.data?.data.ai_response as string;
      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: aiResponse,
        createdAt: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);

      // Save to localStorage
      const existingHistory = getLocalStorage("chat_history") || "[]";
      let chatHistory = [];
      try {
        chatHistory = JSON.parse(existingHistory);
      } catch (error) {
        console.error("Error parsing existing chat history:", error);
        chatHistory = [];
      }

      const newConversation = {
        user_message: inputValue,
        ai_response: aiResponse,
        timestamp: new Date().toISOString(),
        session_id: response.data?.data.session_id || Date.now().toString(),
      };
      chatHistory.push(newConversation);
      setLocalStorage("chat_history", JSON.stringify(chatHistory));

      setInputValue("");
    } catch (error) {
      console.error("Error in chat submission:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleRateResponse = (
    messageId: string,
    rating: "thumbs-up" | "thumbs-down"
  ) => {
    console.log(`Message ${messageId} rated: ${rating}`);
  };

  const handleStop = () => {
    setIsGenerating(false);
  };

  const isLoading = isLoadingChat || isGenerating;

  return (
    <Chat
      suggestions={[]}
      label="Hi, I'm your AI assistant. How can I help you today?"
      className="grow"
      messages={messages}
      handleSubmit={handleSubmit}
      input={inputValue}
      handleInputChange={handleInputChange}
      isGenerating={isLoading}
      stop={handleStop}
      append={() => {}}
      setMessages={setMessages}
      onRateResponse={handleRateResponse}
      allowAttachments={false}
    />
  );
}
