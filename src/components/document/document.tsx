"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState, useEffect } from "react";
import { Trash } from "lucide-react";
import MAlertDialog from "../m-ui/m-alert-dialog";
import { getLocalStorage } from "@/utils/storage";
import MButton from "@/components/m-ui/m-button";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setSidebarTrigger } from "@/redux/slices/sidebartrigger-slice";
import { useCallback, useMemo } from "react";
import { useUploadFileDocumentMutation } from "@/redux/slices/data-slice";
import { useDeleteDocumentMutation } from "@/redux/slices/data-slice";
import { Pencil } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AddDocumentForm from "@/components/document/AddDocumentForm";
import { useGetDocumentsQuery } from "@/redux/slices/data-slice";
import {  DocumentType } from "@/redux/slices/data.types";
import EditDialog from "./EditDialog";

interface StoredFile {
  name: string;
  size: number;
  type: string;
  lastModified: number;
  content: string;
  url: string;
}

// const DocumentService = {
//   getFiles: async (): Promise<StoredFile[]> => {
//     const storedFiles = localStorage.getItem("selectedFiles");
//     if (storedFiles) {
//       return JSON.parse(storedFiles);
//     }
//     return [];
//   },

//   openFile: async (file: StoredFile) => {
//     try {
//       if (file.url) {
//         window.open(file.url, "_blank");
//         return;
//       }
//       const storedFiles = localStorage.getItem("selectedFiles");
//       if (storedFiles) {
//         const filesData = JSON.parse(storedFiles) as StoredFile[];
//         const fileData = filesData.find((f) => f.name === file.name);

//         if (fileData?.content) {
//           // Convert base64 to binary
//           const binaryString = window.atob(fileData.content.split(",")[1]);
//           const bytes = new Uint8Array(binaryString.length);
//           for (let i = 0; i < binaryString.length; i++) {
//             bytes[i] = binaryString.charCodeAt(i);
//           }
//           const blob = new Blob([bytes], { type: fileData.type });
//           const url = URL.createObjectURL(blob);
//           window.open(url, "_blank");
//         } else {
//           toast.error("File content not found");
//         }
//       } else {
//         toast.error("No files found");
//       }
//     } catch (error) {
//       console.error("Error opening file:", error);
//       toast.error("Error opening file");
//     }
//   },
// };

export default function Document() {
  const [files, setfiles] = useState<File[]>([]);
  const [isopenDeleteDialog, setIsopenDeleteDialog] = useState(false);
  const [isopenNoteDialog, setIsopenNoteDialog] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState<string>("");
  const [settingNote, setSettingNote] = useState<string>("");
  const [settingColorCode, setSettingColorCode] = useState<string>("");
  const [settingTags, setSettingTags] = useState<string>("");

  const [noteColors, setNoteColors] = useState<Record<string, string>>({});
  const [uploadFileDocument, { isLoading: isUploading }] =
    useUploadFileDocumentMutation();
  const [deleteDocument] = useDeleteDocumentMutation();

  const { t } = useTranslation();

  const { data: documentsResponse, isLoading: isLoadingDocuments } =
    useGetDocumentsQuery();
  const documents =
    (documentsResponse?.documents as unknown as DocumentType[]) || [];
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      setSidebarTrigger({ text: t("document.document"), iconName: "folder" })
    );
  }, [t, dispatch]);

  useEffect(() => {
    // Load all note colors from localStorage
    const storedColors: Record<string, string> = {};
    files.forEach((file) => {
      const color = getLocalStorage(`note-${file.name}`);
      if (color) {
        storedColors[file.name] = color;
      }
    });
    setNoteColors(storedColors);
  }, [files]);

  useEffect(() => {
    try {
      const storedFiles = localStorage.getItem("selectedFiles");
      if (storedFiles) {
        const filesData = JSON.parse(storedFiles) as StoredFile[];
        const files = filesData.map(
          (fileData) =>
            new File([], fileData.name, {
              type: fileData.type,
              lastModified: fileData.lastModified,
            })
        );
        setfiles(files);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  const onDeleteDocument = useCallback(
    async (id: string) => {
      try {
        const response = await deleteDocument({ id: id }).unwrap();
        if (response) {
          toast.success("Document deleted successfully");
        }
        setIsopenDeleteDialog(false);
      } catch (error) {
        console.error(error);
        toast.error("Error deleting document");
      }
    },
    [deleteDocument]
  );
 
  return useMemo(
    () => (
      <>
        <div className="flex flex-col gap-8">
          <AddDocumentForm
            isLoading={isUploading}
            documents={documents}
          />
          <div className="flex flex-col gap-8 border-2 border-gray-200 p-8  shadow-xl rounded-2xl">
            <div className="flex justify-between">
              <div className="flex gap-4 w-1/4 ">
                <div className="relative">
                  <Input
                    className="rounded-2xl shadow-xl"
                    placeholder={t("document.search")}
                  />
                  <Search className="absolute w-4 h-4 right-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
                </div>
                <Select>
                  <SelectTrigger className="rounded-2xl shadow-xl">
                    <SelectValue placeholder={t("document.filter")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="last_modified">
                      {t("document.last_modified")}
                    </SelectItem>
                    <SelectItem value="file_size">
                      {t("document.file_size")}
                    </SelectItem>
                    <SelectItem value="file_name">
                      {t("document.file_name")}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4">
              {isLoadingDocuments ? (
                <div className="col-span-6 flex justify-center items-center py-8">
                  <span className="text-gray-500">Loading documents...</span>
                </div>
              ) : !documents || documents.length === 0 ? (
                <div className="col-span-6 flex justify-center items-center py-8">
                  <span className="text-gray-500">
                    {t("document.no_file_yet")}
                  </span>
                </div>
              ) : (
                documents.map((doc: any) => (
                  <Card
                    key={doc.id}
                    className="rounded-2xl w-full h-auto shadow-md relative cursor-pointer hover:shadow-lg transition-shadow"
                    style={{
                      backgroundColor: doc.color_code || "#ffffff",
                    }}
                  >
                    <CardHeader>
                      <CardTitle
                        className="text-sm truncate"
                        onClick={() => window.open(doc.file_url, "_blank")}
                      >
                        {doc.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col gap-6 ">
                        <div className="flex flex-col gap-2">
                          <span className="text-sm flex justify-between text-gray-500 items-center gap-2">
                            {t("document.last_modified_description")}:{" "}
                            {new Date(doc.created_at).toLocaleDateString()}
                          </span>
                          <span className="text-sm text-gray-500 flex gap-2">
                            {doc.tags}
                          </span>
                        </div>
                        <MButton
                          className="bg-gray-500 hover:bg-gray-600 w-fit flex items-center gap-2"
                          onClick={() => {
                            setIsopenNoteDialog(true);
                            setSettingNote(doc.title);
                            setSettingColorCode(doc.color_code);
                            setSettingTags(doc.tags);
                            setSelectedFileName(doc.id);
                          }}
                        >
                          <Pencil className="w-4 h-4" />
                          {t("document.edit_button")}
                        </MButton>
                      </div>
                    </CardContent>
                    <div
                      className="absolute top-2 z-10 right-2 cursor-pointer"
                      onClick={(e) => {
                        setSelectedFileName(doc.id);
                        setIsopenDeleteDialog(true);
                      }}
                    >
                      <Trash className="w-4 h-4 text-red-500" />
                    </div>
                  </Card>
                ))
              )}
            </div>
          </div>
        </div>
        <MAlertDialog
          preset="destructive"
          open={isopenDeleteDialog}
          onOpenChange={setIsopenDeleteDialog}
          title={t("document.delete_document")}
          description={t("document.delete_document_description")}
          cancelText={t("document.delete_document_cancel")}
          confirmText={t("document.delete_document_confirm")}
          onConfirm={() => onDeleteDocument(selectedFileName)}
        />
        <EditDialog
          initialData={{
            id: selectedFileName,
            title: settingNote,
            tags: settingTags,
            color_code: settingColorCode,
          }}
          open={isopenNoteDialog}
          onOpenChange={setIsopenNoteDialog}
          fileName={selectedFileName}
          initialColor={noteColors[selectedFileName]}
        />
      </>
    ),
    [
      documents,
      isLoadingDocuments,
      isUploading,
      isopenDeleteDialog,
      isopenNoteDialog,
      selectedFileName,
      noteColors,
      t,
    ]
  );
}
