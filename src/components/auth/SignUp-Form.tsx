"use client";

import MButton from "@/components/m-ui/m-button";
import Image from "next/image";
import googleIcon from "../../../public/assets/icon/google.svg";
import { Separator } from "@/components/ui/separator";
import MInput from "@/components/m-ui/m-input";
import MInputPassword from "@/components/m-ui/m-input-password";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { passwordValidation } from "@/components/m-ui/m-input-password";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider } from "react-hook-form";
import { useEffect } from "react";

const password_error_messages = {
  confirm_password_required: "Confirm password is required",
  passwords_doesnt_match: "Passwords don't match",
};

const formSchema = z
  .object({
    first_name: z.string().min(1, "First name is required"),
    last_name: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email address"),
    password: passwordValidation,
    confirm_password: z
      .string()
      .min(1, password_error_messages.confirm_password_required),
  })
  .refine(({ password, confirm_password }) => password === confirm_password, {
    message: password_error_messages.passwords_doesnt_match,
    path: ["confirm_password"],
  });

type FormSchemaType = z.infer<typeof formSchema>;

export default function SignUpForm({
  onSubmit,
  isLoading,
  onSuccess,
}: {
  onSubmit: (data: FormSchemaType) => void;
  isLoading?: boolean;
  onSuccess?: boolean;
}) {
  const { t } = useTranslation();

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      confirm_password: "",
    },
  });

  useEffect(() => {
    if (onSuccess) {
      form.reset();
    }
  }, [onSuccess]);

  const onSubmitForm = (data: FormSchemaType) => {
    onSubmit(data);
  };

  return (
    <div className="flex flex-col bg-gray-50 rounded-2xl shadow-xl max-w-[600px] w-full items-center justify-center p-6">
      <div className="flex w-full flex-col gap-4">
        <div className="flex w-full flex-col gap-2">
          <p className="text-2xl font-bold font-roboto">{t("signup.title")}</p>
          <p className="text-sm text-gray-500">{t("signup.description")}</p>
        </div>
        <MButton
          preset="secondary"
          size="sm"
          className="w-full rounded-lg bg-transparent border border-gray-200 flex items-center justify-center gap-2"
        >
          <Image src={googleIcon} alt="google" width={30} height={20} />
          <span>{t("signup.signup_with_google")}</span>
        </MButton>
      </div>

      <div className="flex w-1/2 justify-center items-center gap-4 my-4 px-4">
        <Separator className="w-1/2" />
        <span className="text-sm text-gray-500">{t("signup.common.or")}</span>
        <Separator className="w-1/2" />
      </div>

      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmitForm)}
          className="w-full gap-4"
        >
          <div className="flex w-full flex-col gap-4">
            <p className="text-sm text-gray-500">
              {t("signup.or_continue_with")}
            </p>
            <MInput
              required
              error={form.formState.errors.first_name?.message}
              onChange={(e) => {
                form.setValue("first_name", e.target.value);
              }}
              label={t("signup.first_name")}
              placeholder={t("signup.first_name")}
            />
            <MInput
              rounded
              error={form.formState.errors.last_name?.message}
              onChange={(e) => {
                form.setValue("last_name", e.target.value);
              }}
              required
              label={t("signup.last_name")}
              placeholder={t("signup.last_name")}
              type="text"
            />
            <MInput
              required
              error={form.formState.errors.email?.message}
              onChange={(e) => {
                form.setValue("email", e.target.value);
              }}
              label={t("signup.email")}
              placeholder={t("signup.email")}
              type="email"
              rounded
            />
            <MInputPassword
              required
              error={form.formState.errors.password?.message}
              {...form.register("password")}
              label={t("signup.password")}
              placeholder={t("signup.password")}
            />
            <MInputPassword
              required
              error={form.formState.errors.confirm_password?.message}
              {...form.register("confirm_password")}
              label={t("signup.confirm_password")}
              placeholder={t("signup.confirm_password")}
            />
            <MButton
              loading={isLoading}
              type="submit"
              preset="primary"
              size="md"
              className="w-full rounded-full shadow-lg shadow-gray-200"
              disabled={isLoading}
            >
              {t("signup.button")}
            </MButton>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
