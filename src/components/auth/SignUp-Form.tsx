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
import { useRouter } from "next/navigation";
import { FormProvider } from "react-hook-form";

export const wrapper = (props: any) => {
  return (
    <div className="flex w-full items-center justify-center  ">
      <div className="flex flex-col  justify-center items-center bg-white rounded-2xl shadow-lg max-w-[600px] w-full h-full gap-10 p-10 ">
        {props.children}
      </div>
    </div>
  );
};

const password_error_messages = {
  confirm_password_required: "Confirm password is required",
  passwords_doesnt_match: "Passwords don't match",
};

const formSchema = z
  .object({
    firstName: z.string().min(6, "First name is required"),
    lastName: z.string().min(6, "Last name is required"),
    email: z.string().email("Invalid email address"),
    password: passwordValidation,
    confirmPassword: z
      .string()
      .min(1, password_error_messages.confirm_password_required),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: password_error_messages.passwords_doesnt_match,
    path: ["confirmPassword"],
  });

type FormSchemaType = z.infer<typeof formSchema>;

export default function SignUpForm() {
  const { t } = useTranslation();
  const router = useRouter();
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: FormSchemaType) => {
    // todo intergrate with api
    try {
      router.push("/dashboard");
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col  justify-center  items-center bg-gray-50 rounded-2xl  shadow-xl  max-w-[600px] w-full p-10 gap-6">
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
      <div className="flex w-1/2 justify-center items-center gap-2">
        <Separator className="w-1/2" />
        <span className="text-sm text-gray-500">{t("signup.common.or")}</span>
        <Separator className="w-1/2" />
      </div>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full gap-4">
          <div className="flex w-full flex-col gap-4">
            <p className="text-sm text-gray-500">
              {t("signup.or_continue_with")}
            </p>
            <MInput
              required
              error={form.formState.errors.firstName?.message}
              {...form.register("firstName")}
              label={t("signup.first_name")}
              placeholder={t("signup.first_name")}
            />
            <MInput
              rounded
              error={form.formState.errors.lastName?.message}
              {...form.register("lastName")}
              required
              label={t("signup.last_name")}
              placeholder={t("signup.name")}
              type="text"
            />
            <MInput
              required
              error={form.formState.errors.email?.message}
              {...form.register("email")}
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
              error={form.formState.errors.confirmPassword?.message}
              {...form.register("confirmPassword")}
              label={t("signup.confirm_password")}
              placeholder={t("signup.confirm_password")}
            />
            <MButton
              type="submit"
              preset="primary"
              size="md"
              className="w-full rounded-full shadow-lg shadow-gray-200"
            >
              <span>{t("signup.create_account")}</span>
            </MButton>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
