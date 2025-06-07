"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AddDocument from "./AddDocument";
import { Input } from "../ui/input";
import { Search } from "lucide-react";
import { useState, useEffect } from "react";
import { Trash } from "lucide-react";
import MAlertDialog from "../m-ui/m-alert-dilog";
import toast from "react-hot-toast";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface StoredFile {
  name: string;
  size: number;
  type: string;
  lastModified: number;
}

export default function Document() {
  const [files, setfiles] = useState<File[]>([]);
  const [open, setOpen] = useState(false);
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
        <div className="border-2 border-dashed border-gray-200 p-8 rounded-2xl">
          <div className="flex flex-col gap-2 items-center justify-center">
            <AddDocument />
          </div>
        </div>
        <div className="flex flex-col gap-8 border-2 border-gray-200 p-8  shadow-xl rounded-2xl">
          <div className="flex justify-between">
            <div className="flex gap-4 w-1/4 ">
              <div className="relative">
                <Input className="rounded-2xl shadow-xl" placeholder="Search" />
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

          <div className="grid grid-cols-6">
            {files.length === 0 ? (
              <div className=" col-span-6 flex justify-center items-center py-8">
                <span className="text-gray-500">No files yet</span>
              </div>
            ) : (
              files.map((file, index) => (
                <Card
                  key={index}
                  className="rounded-2xl max-w-[200px] h-auto shadow-md relative"
                >
                  <CardHeader>
                    <CardTitle className="text-sm truncate">
                      {file.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col gap-4">
                      <span className="text-xs text-gray-500 flex">
                        {file.type}
                      </span>
                      <span className="text-xs text-gray-500 gap-2 flex">
                        file size:{(file.size / 1024).toFixed(2)} KB
                      </span>
                      <span className="text-xs text-green-500 flex ">
                        last modified:{" "}
                        {new Date(file.lastModified).toLocaleDateString()}
                      </span>
                    </div>
                  </CardContent>
                  <div
                    className="absolute top-2 z-10 right-2 cursor-pointer"
                    onClick={() => {
                      setOpen(true);
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
        open={open}
        onOpenChange={setOpen}
        title="Delete Document"
        description="Are you sure you want to delete this document?"
        cancelText="Cancel"
        confirmText="Delete"
        onConfirm={handleDelete}
      />
    </>
  );
}
