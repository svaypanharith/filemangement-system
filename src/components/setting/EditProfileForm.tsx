"use client";
import MInput from "@/components/m-ui/m-input";
import { FormProvider } from "react-hook-form";
import { useForm } from "react-hook-form";
import MButton from "../m-ui/m-button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface EditProfileFormProps {
  onCancel: () => void;
  onSave: () => void;
}

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
});

type FormSchemaType = z.infer<typeof formSchema>;

export default function EditProfileForm({
  onCancel,
  onSave,
}: EditProfileFormProps) {
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });
  const onSubmit = (data: FormSchemaType) => {
    console.log(data);
    onSave();
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4 w-full"
        >
          <MInput
            label="Name"
            type="text"
            placeholder="Name"
            error={form.formState.errors.name?.message}
            onChange={(e) => {
              form.setValue("name", e.target.value);
            }}
          />
          <MInput
            label="Email"
            type="email"
            placeholder="Email"
            error={form.formState.errors.email?.message}
            onChange={(e) => {
              form.setValue("email", e.target.value);
            }}
          />
          <div className="flex justify-end gap-2">
            <MButton preset="secondary" size="sm" onClick={onCancel}>
              Cancel
            </MButton>
            <MButton preset="primary" size="sm" type="submit">
              Save
            </MButton>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
