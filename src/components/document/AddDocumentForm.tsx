"use client";

import { Upload } from "lucide-react";
import toast from "react-hot-toast";
import { useState } from "react";
import { Input } from "../ui/input";
import { useTranslation } from "react-i18next";
import LoadingAnimation from "../share/loadinganimation";
import { Document } from "@/redux/slices/data.types";

interface AddDocumentProps {
  onSubmit?: (files: File[]) => void;
  isLoading?: boolean;
  documents?: Document[];
}

export default function AddDocumentForm({
  onSubmit,
  isLoading,
  documents,
}: AddDocumentProps) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const { t } = useTranslation();

  // read file as base64
  const readFileAsBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        console.log(
          "File read as base64:",
          file.name,
          result.substring(0, 100) + "..."
        ); // Log first 100 chars
        resolve(result);
      };
      reader.onerror = (e) => reject(e);
      reader.readAsDataURL(file);
    });
  };

  const onSubmitFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      try {
        const existingFiles = documents || [];
        if (existingFiles.find((file: any) => file.title === files[0].name)) {
          toast.error("File already exists");
          return;
        }
        setSelectedFiles(files);
        onSubmit?.(files);
      } catch (error) {
        console.error("Error processing files:", error);
        toast.error("Error uploading files");
      }
    }
  };

  return (
    <div
      className="border-2 border-dashed border-gray-200 p-8 rounded-2xl w-full"
      onDragOver={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      onDrop={(e) => {
        e.preventDefault();
        e.stopPropagation();
        const files = Array.from(e.dataTransfer.files);
        if (files.length > 0) {
          onSubmitFile({
            target: { files: e.dataTransfer.files },
          } as any);
        }
      }}
    >
      <div className="flex flex-col gap-2 items-center justify-center">
        <div className="flex flex-col items-center gap-6 w-full max-w-md">
          <div className="rounded-full p-6 bg-blue-50 hover:border-primary transition-colors cursor-pointer">
            <label className="cursor-pointer block w-full h-full">
              <Upload className="w-20 h-20 text-blue-800" />
              <Input
                type="file"
                className="hidden"
                onChange={onSubmitFile}
                accept=".pdf"
                multiple
              />
            </label>
          </div>
          {isLoading && <LoadingAnimation />}
          {/* // the name file is need to respone from api */}
          {selectedFiles.length > 0 ? (
            <div className="flex flex-col gap-2 w-full">
              {selectedFiles.map((file, index) => (
                <p
                  key={index}
                  className="text-lg font-bold text-black text-center break-words max-w-full"
                >
                  selected file:
                  {file.name}
                </p>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2 w-full">
              <p className="text-lg font-bold text-blue-800 text-center break-words max-w-full">
                {t("document.upload_source")}
              </p>
              <p className="text-sm text-gray-500 text-center">
                {t("document.upload_source_description")}
              </p>
              <p className="text-sm text-gray-500 text-center">
                {t("document.supported_file_types")}: PDF
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
