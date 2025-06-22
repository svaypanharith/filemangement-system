"use client";

import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import { Send } from "lucide-react";
import { setLocalStorage } from "@/utils/storage";
import { useTranslation } from "react-i18next";
const formSchema = z.object({
  message: z.string().min(1, "Message is required"),
});

type FormSchemaType = z.infer<typeof formSchema>;

export default function ChatBotForm() {
  const { t } = useTranslation();
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
    },
  });
  const onSubmit = (data: FormSchemaType) => {
    setLocalStorage("message chatbot", data.message);
  };
  return (
    <div>
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="relative w-full max-w-6xl mx-auto mt-auto"
        >
          <Textarea
            className="w-full p-4 pr-16 rounded-2xl resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-transparent dark:text-white"
            placeholder={t("chatbot.placeholder")}
            {...form.register("message")}
            rows={1}
          />
          <div className="absolute bottom-3 right-3">
            <Button
              className="bg-blue-500 cursor-pointer hover:bg-blue-600 text-white rounded-full p-2.5 transition-all duration-200 hover:scale-105 shadow-md hover:shadow-lg"
              size="icon"
              type="submit"
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
