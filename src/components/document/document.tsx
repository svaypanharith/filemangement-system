"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "../ui/input";
import MButton from "../m-ui/m-button";
import { Plus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export default function Document() {
  return (
    <div className="flex flex-col gap-8 border-2 border-gray-200 p-8  shadow-xl rounded-2xl">
      <div className="flex justify-between">
        <div className="flex gap-4 w-1/4">
          <Input className="rounded-2xl shadow-xl" placeholder="Search" />
          <Select>
            <SelectTrigger className="rounded-2xl shadow-xl">
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="pdf">PDF</SelectItem>
              <SelectItem value="docx">Docx</SelectItem>
              <SelectItem value="doc">Doc</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex gap-2">
          <MButton
            preset="primary"
            size="sm"
            className="gap-2 flex items-center"
          >
            <Plus className="w-6 h-6" />
            Add Document
          </MButton>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <Card key={index} className="rounded-2xl h-auto shadow-md">
            <CardHeader>
              <CardTitle>Document {index + 1}</CardTitle>{" "}
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-2">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Corporis rerum molestias, hic eveniet quis error velit facilis.
                Perferendis, esse quasi?
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
