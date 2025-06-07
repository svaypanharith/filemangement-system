"use client";

import MButton from "@/components/m-ui/m-button";
import Image from "next/image";
import googleIcon from "../../../public/assets/icon/google.svg";
import MInput from "@/components/m-ui/m-input";
import MInputPassword from "@/components/m-ui/m-input-password";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { passwordValidation } from "@/components/m-ui/m-input-password";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider } from "react-hook-form";

const formSchema = z.object({
  email: z.string().email(),
  password: passwordValidation,
});

type FormSchemaType = z.infer<typeof formSchema>;

export default function SignInForm() {
  const { t } = useTranslation();
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: FormSchemaType) => {
    console.log(data);
  };

  return (
    <div className="flex flex-col bg-white rounded-2xl shadow-lg max-w-[600px] w-full h-full gap-10 p-10 ">
      <div className="flex w-full flex-col gap-2">
        <p className="text-2xl font-bold">{t("signin.title")}</p>
        <p className="text-sm text-gray-500">{t("signin.description")}</p>
      </div>
      <MButton
        preset="secondary"
        size="lg"
        className="w-full rounded-lg bg-transparent border border-gray-200 flex items-center justify-center gap-2"
      >
        <Image src={googleIcon} alt="google" width={30} height={20} />
        Continue with Google
      </MButton>
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-full flex-col gap-4"
        >
          <p className="text-sm text-gray-500">
            {t("signin.or_continue_with")}
          </p>
          <MInput
            required
            label={t("signin.email")}
            placeholder={t("signin.email")}
            type="email"
            rounded
            {...form.register("email")}
            error={form.formState.errors.email?.message}
          />
          <MInputPassword
            {...form.register("password")}
            error={form.formState.errors.password?.message}
            required
            label={t("signin.password")}
            placeholder={t("signin.password")}
            onChange={(e) => {
              console.log(e.target.value);
            }}
          />

          <div className="flex w-full justify-between">
            <p className="text-sm flex text-gray-500 gap-2">
              {t("signin.dont_have_account")}
              <Link href="/signup" className="text-blue-500">
                {t("signin.signup")}
              </Link>
            </p>
            <p className="text-sm text-gray-500">
              {t("signin.forgot_password")}
            </p>
          </div>
          <MButton
            type="submit"
            preset="primary"
            size="lg"
            className="w-full rounded-full shadow-lg shadow-gray-200"
          >
            <span>{t("signin.signin_button")}</span>
          </MButton>
        </form>
      </FormProvider>
    </div>
  );
}
