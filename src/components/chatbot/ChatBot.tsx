"use client";

import { useState, useEffect } from "react";
import { useGetChatMutation, useAskQuestionMutation, useGetSessionQueriesQuery } from "@/redux/slices/data-slice";
import { Chat } from "@/components/ui/chat";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { setSidebarTrigger } from "@/redux/slices/sidebartrigger-slice";
import { Message } from "@/components/ui/chat-message";
import { useRouter, useSearchParams } from "next/navigation";

export function ChatBot() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session');
  
  const [getChat, { isLoading: isLoadingChat }] = useGetChatMutation();
  const [askQuestion, { isLoading: isLoadingQuestion }] = useAskQuestionMutation();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentSessionId, setCurrentSessionId] = useState<number | null>(sessionId ? parseInt(sessionId) : null);
  
  const user_id = "1";

  const { data: sessionQueriesData, isLoading: isLoadingSessionQueries } = useGetSessionQueriesQuery(
    { session_id: Number(sessionId) },
    { skip: !sessionId || isNaN(Number(sessionId)) }
  );

  useEffect(() => {
    dispatch(
      setSidebarTrigger({ text: t("chatbot.ask_to_ai"), iconName: "sparkles" })
    );
  }, [dispatch, t]);

  useEffect(() => {
    if (sessionId && sessionQueriesData && !isNaN(Number(sessionId))) {
      setCurrentSessionId(Number(sessionId));
      if (sessionQueriesData.queries?.length) {
        const sessionMessages: Message[] = sessionQueriesData.queries.flatMap(
          (query, index) => [
            {
              id: `user-${query.session_id}-${index}`,
              role: "user",
              content: query.question,
              createdAt: new Date(query.created_at),
            },
            {
              id: `assistant-${query.session_id}-${index}`,
              role: "assistant",
              content: query.answer || "No response available",
              createdAt: new Date(query.created_at),
            },
          ]
        );
        setMessages(sessionMessages);
      } else {
        setMessages([]);
      }
    } else {
      setCurrentSessionId(null);
      setMessages([]);
    }
  }, [sessionId, sessionQueriesData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async (event?: { preventDefault?: () => void }) => {
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
      let response;
      let newSessionId = currentSessionId;

      if (currentSessionId) {
        response = await askQuestion({
          question: inputValue,
          session_id: currentSessionId,
        });
      } else {
        response = await askQuestion({
          question: inputValue,
        });
        newSessionId = response.data?.session_id || null;
        if (newSessionId) {
          setCurrentSessionId(newSessionId);
          router.replace(`/dashboard/chatbot?session=${newSessionId}`);
        }
      }

      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: response.data?.answer || "No response available",
        createdAt: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setInputValue("");
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          id: `error-${Date.now()}`,
          role: "assistant",
          content: "Sorry, there was an error processing your request. Please try again.",
          createdAt: new Date(),
        },
      ]);
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

  const isLoading = isLoadingChat || isLoadingQuestion || isGenerating || isLoadingSessionQueries;

  return (
    <Chat
      suggestions={[]}
      label={currentSessionId ? "Continue your conversation..." : "Hi, I'm your AI assistant. How can I help you today?"}
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
