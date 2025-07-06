"use client";
import MInput from "@/components/m-ui/m-input";
import { FormProvider } from "react-hook-form";
import { useForm } from "react-hook-form";
import MButton from "../m-ui/m-button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import { User } from "./EditProfileDialog";
interface EditProfileFormProps {
  onCancel: () => void;
  onSave: (data: FormSchemaType) => void;
  initialData: User;
  isLoading: boolean;
}

const formSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  username: z.string().min(1, "Username is required"),
});

type FormSchemaType = z.infer<typeof formSchema>;

export default function EditProfileForm({
  onCancel,
  onSave,
  initialData,
  isLoading,
}: EditProfileFormProps) {
  const { t } = useTranslation();
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
  return (
    <div className="flex flex-col gap-4 w-full">
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
            <MButton preset="secondary" size="sm" onClick={onCancel}>
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
