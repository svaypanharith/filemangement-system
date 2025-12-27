"use client";

import MButton from "@/components/m-ui/m-button";
import MInput from "@/components/m-ui/m-input";
import MInputPassword from "@/components/m-ui/m-input-password";
import { useTranslation } from "react-i18next";
import { useForm, FormProvider } from "react-hook-form";
import { passwordValidation } from "@/components/m-ui/m-input-password";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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
    username: z.string().min(1, "Username is required"),
    password: passwordValidation,
    password_confirmation: z
      .string()
      .min(1, password_error_messages.confirm_password_required),
  })
  .refine(({ password, password_confirmation }) => password === password_confirmation, {
    message: password_error_messages.passwords_doesnt_match,
    path: ["password_confirmation"],
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
      username: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
  });

  useEffect(() => {
    if (onSuccess) {
      form.reset();
    }
  }, [onSuccess, form]);

  return (
    <div className="w-full bg-gray-50 rounded-2xl shadow-lg max-w-[600px] w-full h-full gap-10 p-10 ">
      {/* Header Section */}
      <div className="mb-8 text-center md:text-left">
        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          {t("signup.title")}
        </h2>
        <p className="mt-2 text-gray-500 font-medium">
          {t("signup.description")}
        </p>
      </div>

      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          {/* Section: Personal Info (Grid) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <MInput
              required
              {...form.register("first_name")}
              error={form.formState.errors.first_name?.message}
              label={t("signup.first_name")}
              placeholder="John"
              rounded
            />
            <MInput
              required
              {...form.register("last_name")}
              error={form.formState.errors.last_name?.message}
              label={t("signup.last_name")}
              placeholder="Doe"
              rounded
            />
          </div>

          {/* Section: Account Info (Single Column) */}
          <div className="space-y-4">
            <MInput
              required
              {...form.register("username")}
              error={form.formState.errors.username?.message}
              label={t("signup.username")}
              placeholder="johndoe123"
              rounded
            />
            <MInput
              required
              {...form.register("email")}
              error={form.formState.errors.email?.message}
              label={t("signup.email")}
              placeholder="name@example.com"
              type="email"
              rounded
            />
          </div>

          {/* Section: Security (Grid) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <MInputPassword
              required
              {...form.register("password")}
              error={form.formState.errors.password?.message}
              label={t("signup.password")}
              placeholder="••••••••"
            />
            <MInputPassword
              required
              {...form.register("password_confirmation")}
              error={form.formState.errors.password_confirmation?.message}
              label={t("signup.confirm_password")}
              placeholder="••••••••"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <MButton
              loading={isLoading}
              type="submit"
              preset="primary"
              size="lg"
              className="w-full py-6 text-lg font-semibold rounded-xl shadow-md transition-all hover:shadow-lg active:scale-[0.98]"
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