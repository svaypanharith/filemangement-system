"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AddDocument from "@/components/document/AddDocument";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState, useEffect } from "react";
import { Trash, Pen } from "lucide-react";
import MAlertDialog from "../m-ui/m-alert-dialog";
import NoteDialog from "./NoteDialog";
import { getLocalStorage } from "@/utils/storage";
import MButton from "@/components/m-ui/m-button";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface StoredFile {
  name: string;
  size: number;
  type: string;
  lastModified: number;
  content: string;
  url: string;
}

const DocumentService = {
  getFiles: async (): Promise<StoredFile[]> => {
    // For now, get from localStorage
    const storedFiles = localStorage.getItem("selectedFiles");
    if (storedFiles) {
      return JSON.parse(storedFiles);
    }
    return [];
  },

  openFile: async (file: StoredFile) => {
    try {
      // If we have a URL (from API), use it directly
      if (file.url) {
        window.open(file.url, "_blank");
        return;
      }
      //  handle local storage file `selectedFiles`
      const storedFiles = localStorage.getItem("selectedFiles");
      if (storedFiles) {
        const filesData = JSON.parse(storedFiles) as StoredFile[];
        const fileData = filesData.find((f) => f.name === file.name);

        if (fileData?.content) {
          // Convert base64 to binary
          const binaryString = window.atob(fileData.content.split(",")[1]);
          const bytes = new Uint8Array(binaryString.length);
          for (let i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
          }
          const blob = new Blob([bytes], { type: fileData.type });
          const url = URL.createObjectURL(blob);
          window.open(url, "_blank");
        } else {
          toast.error("File content not found");
        }
      } else {
        toast.error("No files found");
      }
    } catch (error) {
      console.error("Error opening file:", error);
      toast.error("Error opening file");
    }
  },
};

export default function Document() {
  const [files, setfiles] = useState<File[]>([]);
  const [isopenDeleteDialog, setIsopenDeleteDialog] = useState(false);
  const [isopenNoteDialog, setIsopenNoteDialog] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState<string>("");
  const [noteColors, setNoteColors] = useState<Record<string, string>>({});
  const { t } = useTranslation();
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
    // todo intergrate with api
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

  const handleFileOpen = async (file: StoredFile) => {
    await DocumentService.openFile(file);
  };

  const handleDelete = () => {
    try {
      // todo intergrate with api
      toast.success("Document deleted successfully");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-8">
        <AddDocument />
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
                  <SelectValue placeholder="Filter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">last modified</SelectItem>
                  <SelectItem value="all">file size</SelectItem>
                  <SelectItem value="all">file name</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4">
            {files.length === 0 ? (
              <div className=" col-span-6 flex justify-center items-center py-8">
                <span className="text-gray-500">No files yet</span>
              </div>
            ) : (
              files.map((file) => (
                <Card
                  key={file.name}
                  className="rounded-2xl w-full h-auto shadow-md relative cursor-pointer hover:shadow-lg transition-shadow"
                  style={{
                    backgroundColor: noteColors[file.name] || "#ffffff",
                  }}
                >
                  <CardHeader>
                    <CardTitle
                      className="text-sm truncate"
                      onClick={() =>
                        handleFileOpen(file as unknown as StoredFile)
                      }
                    >
                      {file.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col gap-6 ">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500 flex items-center gap-2">
                          last modified:{" "}
                          {new Date(file.lastModified).toLocaleDateString()}
                        </span>
                      </div>
                      <MButton
                        className="bg-green-300 hover:bg-green-400 w-fit"
                        onClick={() => {
                          setIsopenNoteDialog(true);
                          setSelectedFileName(file.name);
                        }}
                      >
                        Note
                      </MButton>
                    </div>
                  </CardContent>
                  <div
                    className="absolute top-2 z-10 right-2 cursor-pointer"
                    onClick={(e) => {
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
        title="Delete Document"
        description="Are you sure you want to delete this document?"
        cancelText="Cancel"
        confirmText="Delete"
        onConfirm={handleDelete}
      />
      <NoteDialog
        open={isopenNoteDialog}
        onOpenChange={setIsopenNoteDialog}
        fileName={selectedFileName}
        initialColor={noteColors[selectedFileName]}
      />
    </>
  );
}
