"use client";

import MDialog from "../m-ui/m-dialog";
import MButton from "../m-ui/m-button";
import NoteForm from "./NoteForm";
import { useState } from "react";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();

  return (
    <MDialog
      onOpenAutoFocus={(e) => e.preventDefault()}
      className="w-full max-w-md gap-4"
      header={t("document.note.title")}
      description={t("document.note.description")}
      content={
        <div className="w-full mx-auto">
          <NoteForm
            fileName={fileName}
            initialColor={initialColor}
            onSubmit={onSubmit}
            onSubmitSuccess={() => {
              onOpenChange(false);
              setOnSubmit(false);
            }}
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
            {t("document.note.cancel")}
          </MButton>
          <MButton
            preset="primary"
            onClick={() => {
              setOnSubmit(true);
            }}
          >
            {t("document.note.confirm")}
          </MButton>
        </div>
      }
    />
  );
}
