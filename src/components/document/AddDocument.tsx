"use client";

import { Folder, Upload } from "lucide-react";
import toast from "react-hot-toast";
import { useState } from "react";
import { Input } from "../ui/input";

interface AddDocumentProps {
  onUploadComplete?: () => void;
}

export default function AddDocument({ onUploadComplete }: AddDocumentProps) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

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
      setSelectedFiles(files);
      try {
        const existingFiles = JSON.parse(
          localStorage.getItem("selectedFiles") || "[]"
        );
        if (existingFiles.find((file: any) => file.name === files[0].name)) {
          toast.error("File already exists");
          return;
        }

        const newFiles = await Promise.all(
          files.map(async (file) => {
            const content = await readFileAsBase64(file);
            const fileData = {
              name: file.name,
              size: file.size,
              type: file.type,
              lastModified: file.lastModified,
              content: content,
            };
            return fileData;
          })
        );

        const updatedFiles = [...existingFiles, ...newFiles];
        localStorage.setItem("selectedFiles", JSON.stringify(updatedFiles));
        toast.success("Files uploaded successfully");
        onUploadComplete?.();
      } catch (error) {
        console.error("Error processing files:", error);
        toast.error("Error uploading files");
      }
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-md">
      <div
        className="rounded-full p-6 bg-blue-50 hover:border-primary transition-colors cursor-pointer"
        onDragOver={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        onDrop={(e) => {
          e.preventDefault();
          e.stopPropagation();
          const files = Array.from(e.dataTransfer.files);
          if (files.length > 0) {
            onSubmitFile({ target: { files: e.dataTransfer.files } } as any);
          }
        }}
      >
        <label className="cursor-pointer block w-full h-full">
          <Upload className="w-20 h-20 text-blue-800" />
          <Input
            type="file"
            className="hidden"
            onChange={onSubmitFile}
            accept=".pdf,.doc,.docx,.txt,.csv,.xlsx,.pptx,.rtf,.odt,.ods"
            multiple
          />
        </label>
      </div>
      {selectedFiles.length > 0 ? (
        <div className="flex flex-col gap-2 w-full">
          {selectedFiles.map((file, index) => (
            <p
              key={index}
              className="text-lg font-bold text-black text-center break-words max-w-full"
            >
              {file.name}
            </p>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-2 w-full">
          <p className="text-lg font-bold text-blue-800 text-center break-words max-w-full">
            Upload Source
          </p>
          <p className="text-sm text-gray-500 text-center">
            Drag and drop or choose file to upload
          </p>
          <p className="text-sm text-gray-500 text-center">
            Supported file types: PDF, DOCX, TXT, CSV, XLSX, PPTX, RTF, ODT, ODS
          </p>
        </div>
      )}
    </div>
  );
}
