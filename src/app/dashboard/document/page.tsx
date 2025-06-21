"use client";

import { Folder } from "lucide-react";
import Document from "@/components/document/document";
export default function DocumentPage() {
  return (
    <div className="flex flex-col gap-10  ">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <Folder className="w-5 h-5" />
          <h1 className="text-2xl font-bold">Document</h1>
        </div>
      </div>
      <Document />
    </div>
  );
}
