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
}

export function EditProfileDialog({
  open,
  onOpenChange,
  initialData,
}: EditProfileDialogProps) {
  const { t } = useTranslation();
  const [updateProfileMutation, { isLoading }] = useUpdateProfileMutation();
  const [openImageCropUpload, setOpenImageCropUpload] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const handleUpdateProfile = useCallback(
    (data: { first_name: string; last_name: string; username: string }) => {
      try {
        updateProfileMutation({
          username: data.username,
          first_name: data.first_name,
          last_name: data.last_name,
        });
        toast.success(t("user_account.edit_profile_success"));
        setTimeout(() => {
          onOpenChange(false);
        }, 1000);
      } catch (error) {
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
            });
          }}
        />
      }
      open={open}
      onOpenChange={onOpenChange}
    />
    <ImageCropUpload
        imageSrc={imageSrc || ""}
        onCropComplete={(croppedImage) => {
          setImageSrc(URL.createObjectURL(croppedImage));
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
