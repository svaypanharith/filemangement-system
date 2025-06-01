"use client";
import Header from "@/components/share/header";
import SignUpForm from "@/components/auth/SignUp-Form";
import { useTranslation } from "react-i18next";

export default function SignupPage() {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col w-full h-full">
      <Header back title={t("signup.title")} />
      <div className="flex w-full items-center justify-center p-3">
        <SignUpForm />
      </div>
    </div>
  );
}
