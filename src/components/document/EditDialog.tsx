"use client";

import MDialog from "../m-ui/m-dialog";
import { useTranslation } from "react-i18next";
import EditForm from "./EditForm";
import { NoteFormDataType } from "./EditForm";
import { useUpdateDocumentMutation } from "@/redux/slices/data-slice";
import { useCallback } from "react";
import { toast } from "sonner";

interface NoteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  fileName: string;
  initialColor?: string;
  initialData: NoteFormDataType;
}

export default function EditDialog({
  open,
  onOpenChange,
  initialData,
}: NoteDialogProps) {
  const { t } = useTranslation();
  const [updateDocument] = useUpdateDocumentMutation();
  const onSubmitData = useCallback(async (data: NoteFormDataType ) => {
    try {
      const response = await updateDocument({
        id: data.id,
        title: data.title,
        tags: data.tags,
        color_code: data.color_code,
      });
      if( response.data?.message == "error"){
        throw new Error(response.data?.message);
      }
      toast.success(t("document.edit_document_success"));
      onOpenChange(false);
    } catch (error) {
      toast.error(t("document.edit_document_error"));
    }
  }, [updateDocument, t, onOpenChange]);
  return (
    <MDialog
      onOpenAutoFocus={(e) => e.preventDefault()}
      className="w-full max-w-md gap-4"
      header={t("document.edit_document")}
      description={t("document.edit_document_description")}
      content={
        <div className="w-full mx-auto">
          <EditForm
            onCancel={() => {
              onOpenChange(false);
            }}
            onSubmitData={(data) => {
              onSubmitData(data);
            }}
            initialData={initialData}
          />
        </div>
      }
      open={open}
      onOpenChange={onOpenChange}
    />
  );
}
