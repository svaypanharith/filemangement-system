"use client";

import React from "react";
import { useState } from "react";
import Cropper from "react-easy-crop";
import { setLocalStorage } from "@/utils/storage";

import MDialog from "../m-ui/m-dialog";
import MButton from "../m-ui/m-button";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

interface ImageCropUploadProps {
  imageSrc: string;
  userid:string;
  onCropComplete: (imageDataUrl?: string) => void;
  onClose: () => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  linkName?: string;
  type?: "custom" | "native";
  path?: string;
}

export default function ImageCropUpload({
  imageSrc,
  onCropComplete,
  onClose,
  open,
  setOpen,
  linkName,
  type,
  path,
  userid
}: ImageCropUploadProps) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  // const { uploadImage, isuploading } = useFileUpload({ path });

  interface CroppedAreaPixels {
    x: number;
    y: number;
    width: number;
    height: number;
  }

  const [croppedAreaPixels, setCroppedAreaPixels] = useState<CroppedAreaPixels | null>(null);

  const handleCropComplete = (_: unknown, croppedAreaPixels: CroppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };
  const { t } = useTranslation();
  const generateCroppedImage = async () => {
    const image = new Image();
    image.src = imageSrc;
    await new Promise(resolve => (image.onload = resolve));

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx || !croppedAreaPixels) return;

    canvas.width = croppedAreaPixels.width;
    canvas.height = croppedAreaPixels.height;

    ctx.drawImage(
      image,
      croppedAreaPixels.x,
      croppedAreaPixels.y,
      croppedAreaPixels.width,
      croppedAreaPixels.height,
      0,
      0,
      croppedAreaPixels.width,
      croppedAreaPixels.height
    );

    const croppedImageBlob = await new Promise<Blob | null>(resolve => {
      canvas.toBlob(blob => resolve(blob), "image/jpeg");
    });

    if (!croppedImageBlob) {
      toast.error("Failed to process cropped image.");
      return;
    }

    const croppedImageFile = new File(
      [croppedImageBlob],
      `${Date.now()}-${linkName?.toLowerCase().replace(/\s+/g, "")}-${type}-icon-cropped.jpg`,
      { type: "image/jpeg" }
    );

    const convertImageToBase64 = (image: File) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
    };

    const imageDataUrl = await convertImageToBase64(croppedImageFile);

    const reader = new FileReader();
    reader.onloadend = () => {


      const userImageData = {
        userId: userid,
        imageDataUrl: imageDataUrl,
        fileName: croppedImageFile.name,
        fileType: croppedImageFile.type,
        timestamp: Date.now()
      };
      onCropComplete(imageDataUrl as unknown as string)
      setLocalStorage(`user_image_${userid}`, JSON.stringify(userImageData));
      toast.success(t("user_account.crope_image_success"));
    };
    reader.readAsDataURL(croppedImageFile);

    onClose();
  };

  return (
    <MDialog
      open={open}
      onOpenChange={setOpen}
      header="Crop Image"
      titleClassName="text-2xl"
      description="Crop the image to the desired size"
      descriptionClassName="text-md"
      hideCloseButton
      content={
       <div className="flex flex-col gap-4">
        <div className="relative w-full h-64 bg-gray-200 p-4">
        <Cropper
          image={imageSrc}
          crop={crop}
          zoom={zoom}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={handleCropComplete}
          aspect={1}
        />
        </div>
        <div className="flex justify-end  text-white mt-4 space-x-4">
          <MButton onClick={generateCroppedImage} loading={false}>
            <span className="text-lg">Save</span>
          </MButton>  
       </div>
       </div>
      }
    />
  );
}
