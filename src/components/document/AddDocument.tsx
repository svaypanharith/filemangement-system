"use client";

import { Folder } from "lucide-react";
import toast from "react-hot-toast";
import { useState } from "react";
import { Input } from "../ui/input";

export default function AddDocument() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const onSubmitFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      setSelectedFiles(files);

      const existingFiles = JSON.parse(
        localStorage.getItem("selectedFiles") || "[]"
      );

      const newFileNames = files.map((file) => ({
        name: file.name,
        size: file.size,
        type: file.type,
        lastModified: file.lastModified,
      }));

      const updatedFiles = [...existingFiles, ...newFileNames];
      localStorage.setItem("selectedFiles", JSON.stringify(updatedFiles));

      toast.success("Files uploaded successfully");
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-md">
      <div
        className="rounded-full p-6 border-2 border-dashed border-gray-300 hover:border-primary transition-colors cursor-pointer"
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
          <Folder className="w-30 h-30 text-gray" />
          <Input
            type="file"
            className="hidden"
            onChange={onSubmitFile}
            accept=".pdf"
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
          <p className="text-lg font-bold text-black text-center break-words max-w-full">
            Documents
          </p>
          <p className="text-sm text-gray-500 text-center">
            Add a document to your collection
          </p>
          <p className="text-sm text-gray-500 text-center">
            Drag and drop your files here or click to upload
          </p>
        </div>
      )}
    </div>
  );
}
