"use client";
import MDialog from "@/components/m-ui/m-dialog";
import EditProfileForm from "./EditProfileForm";
import { useTranslation } from "react-i18next";

import { useUpdateProfileMutation } from "@/redux/slices/data-slice";
import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import ImageCropUpload from "../share/crop-image";

export interface User {
  id: string;
  username: string;
  first_name: string;
  last_name: string;
}

interface EditProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData: User;
  initialImage: string;
}

export function EditProfileDialog({
  open,
  onOpenChange,
  initialData,
  initialImage,
}: EditProfileDialogProps) {
  const { t } = useTranslation();
  const [updateProfileMutation, { isLoading }] = useUpdateProfileMutation();
  const [openImageCropUpload, setOpenImageCropUpload] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const handleUpdateProfile = useCallback(
    async (data: { first_name: string; last_name: string; username: string, avatar: string }) => {
      try {
      const response = await updateProfileMutation({
          username: data.username,
          first_name: data.first_name,
          last_name: data.last_name,
          avatar: "test",
        });
        if(response.data?.status !== 200){
          toast.error(response.data?.message || "something went wrong")
          onOpenChange(false);
          return;
        } 
        toast.success(t("user_account.edit_profile_success"));
        onOpenChange(false);
      } catch (error) {
        toast.error(error as string);
        console.error("Error updating profile:", error);
      }
    },
    [updateProfileMutation, onOpenChange]
  );
  return (
    <>
    <MDialog
      header={t("user_account.edit_profile")}
      description={t("user_account.edit_profile_description")}
      content={
        <EditProfileForm
          imageurl={imageSrc || ""}
          onImageCropUpload={(imageSrc) => {
            setImageSrc(imageSrc);
      
          }}
          onOpenImageCropUpload={() => {
            onOpenChange(false);
            setOpenImageCropUpload(true);
          }}
          isLoading={isLoading}
          initialData={initialData}
          onOpenChange={onOpenChange}
          onSave={(data) => {
            handleUpdateProfile({
              first_name: data.first_name,
              last_name: data.last_name,
              username: data.username,
              avatar: imageSrc || initialImage,
            });
          }}
        />
      }
      open={open}
      onOpenChange={onOpenChange}
    />
    <ImageCropUpload
       userid={initialData.id}
        imageSrc={imageSrc || ""}
        onCropComplete={(imageDataUrl) => {
          setImageSrc(imageDataUrl || "");
        }}
        onClose={() => {
          setOpenImageCropUpload(false);
          onOpenChange(true);
        }}
        open={openImageCropUpload}
        setOpen={setOpenImageCropUpload}
      />
    </>
  );
}
