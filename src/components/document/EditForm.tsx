"use client";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import MInput from "../m-ui/m-input";
import MButton from "../m-ui/m-button";

export interface NoteFormDataType {
  id: string;
  title: string;
  tags: string;
  color_code: string;
}

interface NoteFormProps {
  initialData: NoteFormDataType;
  onSubmitData: (data: NoteFormDataType) => void;
  onCancel: () => void;
}

export default function EditForm({
  initialData,
  onSubmitData,
  onCancel,
}: NoteFormProps) {
  const [color, setColor] = useState(initialData.color_code || "#ffffff");
  const { t } = useTranslation();
  const documentColors = [
    "#3b82f6", // Blue
    "#8b5cf6", // Purple
    "#10b981", // Green
    "#f59e0b", // Amber
    "#ef4444", // Red
    "#6b7280", // Gray
    "#ec4899", // Pink
    "#06b6d4", // Cyan
    "#000000", // Black
    "#ffffff", // White
    "#86efac", // lig green
    "#fca5a5", // lig red
  ];

  const formSchema = z.object({
    title: z.string().min(1, { message: "Title is required" }),
    tags: z.string().min(1, { message: "Tags are required" }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialData.title || "",
      tags: initialData.tags || "",
    },
  });

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    onSubmitData({...data, color_code: color, id: initialData.id});
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="w-full gap-2">
        <div className="w-full max-w-xs mx-auto flex flex-col gap-2">
          <Card className="bg-transparent backdrop-blur-sm border border-gray-300 rounded-2xl p-5 shadow-2xl shadow-gray-900/5">
            <div className="flex flex-col gap-2">
              <MInput
                label="title"
                defaultValue={initialData.title}
                placeholder="title"
                error={form.formState.errors.title?.message}
                onChange={(e) => {
                  form.setValue("title", e.target.value);
                }}
              />
              <MInput
                label="tags"
                defaultValue={initialData.tags}
                error={form.formState.errors.tags?.message}
                placeholder="tags"
                onChange={(e) => {
                  form.setValue("tags", e.target.value);
                }}
              />
        
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full shadow-sm"
                  style={{ backgroundColor: color }}
                ></div>
                <div>
                  <h4 className="font-semibold text-gray-500 text-sm">
                    {t("document.note.document_note")}
                  </h4>
                  <p className="text-xs text-gray-500 truncate max-w-[200px]">
                    {initialData.title}
                  </p>
                </div>
              </div>
            </div>
            <div
              className="w-full h-16 mt-2 rounded-xl relative overflow-hidden transition-all duration-300 hover:shadow-lg"
              style={{
                background: `linear-gradient(135deg, ${color}15 0%, ${color}30 100%)`,
                border: `1px solid ${color}40`,
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className="w-8 h-8 rounded-lg shadow-sm"
                  style={{ backgroundColor: color }}
                ></div>
              </div>
            </div>

            {/* Color Selection */}
            <div className="flex flex-col gap-2 ">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">
                  {t("document.note.color_theme")}
                </span>
              </div>

              <div className="grid grid-cols-4 gap-2">
                {documentColors.map((docColor, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setColor(docColor)}
                    className={`h-9 rounded-lg cursor-pointer transition-all duration-200 hover:scale-105 ${
                      color === docColor
                        ? "ring-2 ring-offset-2 ring-blue-400"
                        : "hover:shadow-md"
                    }`}
                    style={{
                      background: `linear-gradient(135deg, ${docColor} 0%, ${docColor}dd 100%)`,
                    }}
                  >
                    {color === docColor && (
                      <div className="w-full h-full rounded-lg flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </Card>
          <div className="flex justify-end mt-2 gap-2">  
            <MButton
              preset="secondary"
              size="sm"
              type="button"
              onClick={onCancel}
            >
              {t("document.note.cancel")}
            </MButton>  
            <MButton
              preset="primary"
              size="sm"
              type="submit"
            >
              {t("document.note.save")}
            </MButton>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}