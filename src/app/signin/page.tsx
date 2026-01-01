"use client";
import Header from "@/components/share/header";
import { SignInForm } from "@/components/auth/SigIn-Form";
import { useTranslation } from "react-i18next";
import { Base } from "@/components/share/base";
import { useState } from "react";
import { FormSchemaType } from "@/components/auth/SigIn-Form";
import { useSignInMutation } from "@/redux/slices/auth-slice";
import { useCallback } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useAuth } from "@/provider/AuthProvider";
import { useAppDispatch } from "@/redux/store";

const SignInPage = () => {
  const { t } = useTranslation();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [signIn, { isLoading }] = useSignInMutation();
  const router = useRouter();
  const { login } = useAuth();
  const dispatch = useAppDispatch();

  const onSubmit = useCallback(
    async (data: FormSchemaType) => {
      try {
        const response = await signIn(data).unwrap();
        if (response.status !== 200) {
          throw new Error(response.message || "Sign in failed");
        }
        toast.success(t("signin.sigin_success"));
        login(response.access_token || "");
        setIsSubmitted(true);
      } catch (error: any) {
        toast.error(error.data?.message || "Sign in failed");
      }
    },
    [signIn, dispatch, login, router]
  );

  return (
    <Base title={t("signin.title")}>
      <div className="w-full flex flex-col items-center justify-center">        
      <SignInForm
        onSubmitData={onSubmit}
        isLoading={isLoading}
        onSuccess={isSubmitted}
      />
      </div>
    </Base>
  );
};

export default SignInPage;