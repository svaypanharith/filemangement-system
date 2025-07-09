"use client";
import MInput from "@/components/m-ui/m-input";
import { FormProvider } from "react-hook-form";
import { useForm } from "react-hook-form";
import MButton from "../m-ui/m-button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import { User } from "./EditProfileDialog";
import { User as UserIcon } from "lucide-react";
import Image from "next/image";
import { Input } from "../ui/input";
import { useState } from "react";
interface EditProfileFormProps {
  onOpenChange: (open: boolean) => void;
  onSave: (data: FormSchemaType) => void;
  onImageCropUpload: (imageSrc: string) => void;
  initialData: User;
  isLoading: boolean;
  onOpenImageCropUpload: (open: boolean) => void;
}
const formSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  username: z.string().min(1, "Username is required"),
});

type FormSchemaType = z.infer<typeof formSchema>;

export default function EditProfileForm({
  onOpenChange,
  onSave,
  initialData,
  isLoading,
  onOpenImageCropUpload,
  onImageCropUpload,
}: EditProfileFormProps) {
  const { t } = useTranslation();
  const [openImageCropUpload, setOpenImageCropUpload] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: initialData.first_name,
      last_name: initialData.last_name,
      username: initialData.username,
    },
  });
  const onSubmit = (data: FormSchemaType) => {
    onSave(data);
  };
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result as string);
        onImageCropUpload(reader.result as string);
      };
      reader.readAsDataURL(file);
      onOpenImageCropUpload(true);
    }
  };
  return (
    <div className="flex flex-col gap-4 w-full justify-center items-center">
      <div className="flex items-center gap-4 flex-col">
      <label htmlFor="image-upload" className="bg-gray-100 w-24 h-24 flex items-center text-center justify-center rounded-full p-2 cursor-pointer" onClick={() => {
      }}>
        <Input type="file" className="hidden" id="image-upload" onChange={handleImageUpload} />
        {imageSrc ? <Image src={imageSrc} 
          fill
          objectFit="cover"
         alt="profile" className="rounded-full" /> : <UserIcon className="h-8 w-8 text-blue-500 " />}
      </label>
      <span className="text-sm font-semibold text-blue-500">{t("user_account.upload_image")}</span>
      </div>
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4 w-full"
        >
          <MInput
            label={t("user_account.name")}
            type="text"
            placeholder={initialData.first_name}
            defaultValue={initialData.first_name}
            error={form.formState.errors.first_name?.message}
            onChange={(e) => {
              form.setValue("first_name", e.target.value);
            }}
          />
          <MInput
            defaultValue={initialData.last_name}
            label={t("user_account.last_name")}
            type="text"
            placeholder={initialData.last_name}
            error={form.formState.errors.last_name?.message}
            onChange={(e) => {
              form.setValue("last_name", e.target.value);
            }}
          />
          <MInput
            defaultValue={initialData.username}
            label={t("user_account.user_name")}
            type="text"
            placeholder={initialData.username}
            error={form.formState.errors.username?.message}
            onChange={(e) => {
              form.setValue("username", e.target.value);
            }}
          />
          <div className="flex justify-end gap-2">
            <MButton preset="secondary" size="sm" type="button" onClick={() => onOpenChange(false)}>
              {t("user_account.cancel")}
            </MButton>
            <MButton
              preset="primary"
              size="sm"
              type="submit"
              loading={isLoading}
            >
              {t("user_account.save")}
            </MButton>
          </div>
        </form>
      </FormProvider>

    </div>
  );
}
