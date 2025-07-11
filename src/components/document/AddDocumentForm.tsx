"use client";

import { Upload } from "lucide-react";
import toast from "react-hot-toast";
import { useState, useCallback } from "react";
import { Input } from "../ui/input";
import { useTranslation } from "react-i18next";
import LoadingAnimation from "../share/loadinganimation";
import { DocumentType } from "@/redux/slices/data.types";
import { useUploadFileDocumentMutation } from "@/redux/slices/data-slice";


interface AddDocumentProps {
  isLoading?: boolean;
  documents?: DocumentType[];
}

export default function AddDocumentForm({
  isLoading,
  documents,
}: AddDocumentProps) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const { t } = useTranslation();
  const [uploadFileDocument] = useUploadFileDocumentMutation();

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

  const onSubmitFile = useCallback(
    async (files: File[]) => {
      try {
        if (!files || files.length === 0) {
          toast.error("No files selected");
          return;
        }
        
        files.forEach((file, index) => {
          if (!file.name || file.size === 0) {
            console.error(`Invalid file at index ${index}:`, file);
            toast.error(`Invalid file: ${file.name}`);
            return;
          }
        });
        
        const formData = new FormData();
        files.forEach((file) => {
          formData.append("files[]", file);
        });
        
        const response = await uploadFileDocument(formData).unwrap();
        if (response) {
          toast.success("Files uploaded successfully");
        }
      } catch (error) {
        console.error("Upload error:", error);
        toast.error("Error uploading files");
      }
    },
    [uploadFileDocument]
  );

  const handleFileInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    if (files.length > 0) {
      try {
        const existingFiles = documents || [];
        if (existingFiles.find((file: any) => file.title === files[0].name)) {
          toast.error(t("document.already_exists"));
          return;
        }
        setSelectedFiles(files);
        await onSubmitFile(files);
      } catch (error) {
        console.error("Error processing files:", error);
        toast.error("Error uploading files");
      }
    }
  };

  const handleFileDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const files = Array.from(e.dataTransfer.files);
    
    
    if (files.length > 0) {
      try {
        const existingFiles = documents || [];
        if (existingFiles.find((file: any) => file.title === files[0].name)) {
          toast.error("File already exists");
          return;
        }
        setSelectedFiles(files);
        await onSubmitFile(files);
      } catch (error) {
        console.error("Error processing dropped files:", error);
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
      onDrop={handleFileDrop}
    >
      <div className="flex flex-col gap-2 items-center justify-center">
        <div className="flex flex-col items-center gap-6 w-full max-w-md">
          <div className="rounded-full p-6 bg-blue-50 hover:border-primary transition-colors cursor-pointer">
            <label className="cursor-pointer block w-full h-full">
              <Upload className="w-20 h-20 text-blue-800" />
              <Input
                type="file"
                className="hidden"
                onChange={handleFileInputChange}
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
