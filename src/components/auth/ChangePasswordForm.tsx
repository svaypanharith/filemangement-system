"use client";
import MInputPassword, {
  passwordValidation,
} from "@/components/m-ui/m-input-password";
import { useForm, FormProvider } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import MButton from "@/components/m-ui/m-button";

interface ChangePasswordFormProps {
  onOpenChange: (open: boolean) => void;
}

const password_error_messages = {
  passwords_doesnt_match: "Passwords don't match",
  confirm_password_required: "Confirm password is required",
};

const formSchema = z
  .object({
    currentPassword: passwordValidation,
    newPassword: passwordValidation,
    confirmPassword: z
      .string()
      .min(1, password_error_messages.confirm_password_required),
  })
  .refine(
    ({ newPassword, confirmPassword }) => newPassword === confirmPassword,
    {
      message: password_error_messages.passwords_doesnt_match,
      path: ["confirmPassword"],
    }
  );

type FormSchemaType = z.infer<typeof formSchema>;

export default function ChangePasswordForm({
  onOpenChange,
}: ChangePasswordFormProps) {
  const { t } = useTranslation();
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: FormSchemaType) => {
    console.log("data", data);
  };

  return (
    <div className="flex flex-col gap-6">
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
        >
          <MInputPassword
            placeholder={t("setting.change_password.current_password")}
            required
            error={form.formState.errors.currentPassword?.message}
            name="currentPassword"
          />
          <MInputPassword
            placeholder={t("setting.change_password.new_password")}
            required
            error={form.formState.errors.newPassword?.message}
            name="newPassword"
          />
          <MInputPassword
            placeholder={t("setting.change_password.confirm_password")}
            required
            error={form.formState.errors.confirmPassword?.message}
            name="confirmPassword"
          />
          <div className="flex justify-end gap-2">
            <MButton
              preset="secondary"
              size="sm"
              onClick={() => onOpenChange(false)}
              type="button"
            >
              {t("setting.change_password.cancel_button")}
            </MButton>
            <MButton
              preset="primary"
              size="sm"
              type="submit"
              disabled={form.formState.isSubmitting}
            >
              {t("setting.change_password.change_password_button")}
            </MButton>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
