"use client";
import { useState, useEffect } from "react";
import { setLocalStorage } from "@/utils/storage";
import toast from "react-hot-toast";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";

interface NoteFormProps {
  fileName: string;
  initialColor?: string;
  onSubmit: boolean;
  onSubmitSuccess: () => void;
}

export default function NoteForm({
  fileName,
  initialColor,
  onSubmit,
  onSubmitSuccess,
}: NoteFormProps) {
  const [color, setColor] = useState(initialColor || "#3b82f6");

  const documentColors = [
    "#3b82f6", // Blue
    "#8b5cf6", // Purple
    "#10b981", // Green
    "#f59e0b", // Amber
    "#ef4444", // Red
    "#6b7280", // Gray
    "#ec4899", // Pink
    "#06b6d4", // Cyan
  ];

  useEffect(() => {
    if (onSubmit) {
      console.log(`Saving note-${fileName} with color: ${color}`);
      setLocalStorage(`note-${fileName}`, color || "#000000");
      toast.success(`Note Color is changed successfully`);
      setTimeout(() => {
        onSubmitSuccess();
      }, 2000);
    }
  }, [color, onSubmit, fileName]);

  return (
    <div className="w-full max-w-xs mx-auto">
      {/* Modern Card Container */}
      <Card className="bg-transparent backdrop-blur-sm border border-gray-300 rounded-2xl p-5 shadow-2xl shadow-gray-900/5">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div
            className="w-3 h-3 rounded-full shadow-sm"
            style={{ backgroundColor: color }}
          ></div>
          <div>
            <h4 className="font-semibold text-gray-500 text-sm">
              Document Note
            </h4>
            <p className="text-xs text-gray-500 truncate max-w-[200px]">
              {fileName}
            </p>
          </div>
        </div>
        <div
          className="w-full h-16 rounded-xl mb-4 relative overflow-hidden transition-all duration-300 hover:shadow-lg"
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
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">
              Color Theme
            </span>
          </div>

          <div className="grid grid-cols-4 gap-2">
            {documentColors.map((docColor, index) => (
              <button
                key={index}
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
    </div>
  );
}
