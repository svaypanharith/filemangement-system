"use client";

import { useState } from "react";
import { Input } from "../ui/input";
import { setLocalStorage } from "@/utils/storage";
import { useEffect } from "react";
import { toast } from "react-hot-toast";

interface NoteFormProps {
  fileName: string;
  initialColor?: string;
  onSubmit: boolean;
}

export default function NoteForm({
  fileName,
  initialColor,
  onSubmit,
}: NoteFormProps) {
  const [color, setColor] = useState(initialColor || "#FFFFFF");
  useEffect(() => {
    if (onSubmit) {
      setLocalStorage(`note-${fileName}`, color || "#000000");
      toast.success("Note saved successfully");
    }
  }, [color, onSubmit, fileName]);

  return (
    <div className="w-full mx-auto">
      <Input
        placeholder="Note"
        type="color"
        className="cursor-pointer"
        value={color}
        onChange={(e) => setColor(e.target.value)}
      />
    </div>
  );
}
