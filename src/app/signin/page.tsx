"use client";
import Header from "@/components/share/header";
import SignInForm from "@/components/auth/SigIn-Form";
import { useTranslation } from "react-i18next";

const SignInPage = () => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col w-full h-full">
      <Header back title={t("signin.title")} />
      <div className="flex w-full  items-center justify-center p-3">
        <SignInForm />
      </div>
    </div>
  );
};

export default SignInPage;
