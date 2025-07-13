"use client";
import MInput from "@/components/m-ui/m-input";
import { FormProvider } from "react-hook-form";
import { useForm } from "react-hook-form";
import MButton from "../m-ui/m-button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import { User } from "./EditProfileDialog";
import { UserIcon } from "lucide-react";
import Image from "next/image";
import { Input } from "../ui/input";
import { getLocalStorage } from "@/utils/storage";
import { setUserProfile } from "@/redux/slices/userprofileslice";
import { useAppSelector, useAppDispatch } from "@/redux/store";
import { RootState } from "@/redux/store";
import { useCallback} from "react";


interface EditProfileFormProps {
  onOpenChange: (open: boolean) => void;
  onSave: (data: FormSchemaType) => void;
  onImageCropUpload: (imageSrc: string) => void;
  initialData: User;
  isLoading: boolean;
  imageurl: string;
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
  imageurl,
}: EditProfileFormProps) {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const userProfile = useAppSelector(
    (state: RootState) => state.userProfile.userProfile
  );

  let image = "";
  const userImageRaw = getLocalStorage(`user_image_${initialData.id}`);
  if (userImageRaw) {
    try {
      const parsed =
        typeof userImageRaw === "string"
          ? JSON.parse(userImageRaw)
          : userImageRaw;
      image = parsed?.imageDataUrl || "";
    } catch {
      image = "";
    }
  }
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: userProfile?.first_name || initialData.first_name,
      last_name: userProfile?.last_name || initialData.last_name  ,
      username: userProfile?.username || initialData.username,
    },
  });
  const onSubmit = (data: FormSchemaType) => {
    onSave(data);
  };

  const handleImageUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          onImageCropUpload(reader.result as string);
          const currentValues = form.getValues();
          dispatch(
            setUserProfile({
              first_name: currentValues.first_name,
              last_name: currentValues.last_name,
              username: currentValues.username,
            })
          );
        };
        reader.readAsDataURL(file);
        onOpenImageCropUpload(true);
      }
    },
    [form, dispatch, onImageCropUpload, onOpenImageCropUpload]
  );

  return (
    <div className="flex flex-col gap-4 w-full justify-center items-center">
      <div className="flex items-center gap-4 flex-col">
        {imageurl || image ? (
          <div className="flex flex-col items-center justify-center gap-2">
            <label
              htmlFor="image-upload"
              className="cursor-pointer relative overflow-hidden"
            >
              <Input
                type="file"
                className="hidden"
                id="image-upload"
                onChange={handleImageUpload}
              />
              <Image
                src={imageurl || image}
                width={80}
                height={80}
                alt="profile"
                className="rounded-full object-cover hover:opacity-80 transition-opacity"
              />
            </label>
            <span className="text-sm font-semibold text-blue-500">
              profile image
            </span>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <label
              htmlFor="image-upload"
              className="bg-gray-100 w-24 h-24 flex items-center text-center justify-center rounded-full p-2 cursor-pointer relative overflow-hidden"
            >
              <Input
                type="file"
                className="hidden"
                id="image-upload"
                onChange={handleImageUpload}
              />
              <UserIcon className="h-8 w-8 text-blue-500" />
            </label>
            <span className="text-sm font-semibold text-blue-500">
              {t("user_account.upload_image")}
            </span>
          </div>
        )}
      </div>
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4 w-full"
        >
          <MInput
            label={t("user_account.name")}
            type="text"
            placeholder={userProfile?.first_name || initialData.first_name}
            defaultValue={userProfile?.first_name || initialData.first_name}
            error={form.formState.errors.first_name?.message}
            onChange={(e) => {
              form.setValue("first_name", e.target.value);
            }}
          />
          <MInput
            defaultValue={userProfile?.last_name || initialData.last_name}
            label={t("user_account.last_name")}
            type="text"
            placeholder={userProfile?.last_name || ""}
            error={form.formState.errors.last_name?.message}
            onChange={(e) => {
              form.setValue("last_name", e.target.value);
            }}
          />
          <MInput
            defaultValue={userProfile?.username || initialData.username}
            label={t("user_account.user_name")}
            type="text"
            placeholder={userProfile?.username || ""}
            error={form.formState.errors.username?.message}
            onChange={(e) => {
              form.setValue("username", e.target.value);
            }}
          />
          <div className="flex justify-end gap-2">
            <MButton
              preset="secondary"
              size="sm"
              type="button"
              onClick={() => onOpenChange(false)}
            >
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
