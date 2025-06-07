"use client";

import MDialog from "../m-ui/m-dialog";
import MButton from "../m-ui/m-button";
import NoteForm from "./NoteForm";
import { useState } from "react";
interface NoteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  fileName: string;
  initialColor?: string;
}

export default function NoteDialog({
  open,
  onOpenChange,
  fileName,
  initialColor,
}: NoteDialogProps) {
  const [onSubmit, setOnSubmit] = useState(false);

  return (
    <MDialog
      onOpenAutoFocus={(e) => e.preventDefault()}
      className="w-full max-w-md gap-4"
      header={"Note"}
      description={"Add a note to the document for your document"}
      content={
        <div className="w-full mx-auto">
          <NoteForm
            fileName={fileName}
            initialColor={initialColor}
            onSubmit={onSubmit}
          />
        </div>
      }
      open={open}
      onOpenChange={onOpenChange}
      footer={
        <div className="flex justify-end gap-2">
          <MButton
            preset="secondary"
            size="sm"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </MButton>
          <MButton
            preset="primary"
            onClick={() => {
              setOnSubmit(true);
              onOpenChange(false);
            }}
          >
            Save
          </MButton>
        </div>
      }
    />
  );
}
