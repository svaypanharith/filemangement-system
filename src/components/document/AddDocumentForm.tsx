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
  documents?: DocumentType[];
}

export default function AddDocumentForm({
  documents,
}: AddDocumentProps) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const { t } = useTranslation();
  const [uploadFileDocument , {isLoading: isUploading}] = useUploadFileDocumentMutation();


  const onSubmitFile = useCallback(
    async (files: File[]) => {
      try {
        if (!files || files.length === 0) {
          toast.error("No files selected");
          return;
        }
        
        files.forEach((file) => {
          if (!file.name || file.size === 0) {
            toast.error(`Invalid file: ${file.name}`);
            return;
          }
        });
        
        const formData = new FormData();
        files.forEach((file) => {
          formData.append("files[]", file);
        });
        
        const response = await uploadFileDocument(formData).unwrap();
        if (response.message !== "Files uploaded successfully") {
          throw new Error(response.message);
        }
        toast.success("upload file successfully !");
      } catch (error) {
        toast.error("Error uploading files");
      }
    },
    [uploadFileDocument]
  );

   const handleFileInputChange = async (e: React.ChangeEvent<HTMLInputElement> | React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    let files: File[] = [];
    
    if ('files' in e.target) {
      files = Array.from(e.target.files || []);
    }
    else if ('dataTransfer' in e) {
      files = Array.from(e.dataTransfer.files || []);
    }
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
      onDrop={handleFileInputChange}
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
          {isUploading && <LoadingAnimation />}
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
