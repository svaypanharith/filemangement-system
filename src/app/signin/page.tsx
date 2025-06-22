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
        console.log("Login Response:", response);
        if (response.status !== true) {
          throw new Error(response.message || "Something went wrong");
        }
        login(response.token || "", response.data?.id);
        setIsSubmitted(true);
        toast.success(response.message || "Sign in successful");
        router.push("/dashboard");
      } catch (error: any) {
        toast.error(error.data?.message || "Sign in failed");
      }
    },
    [signIn, dispatch, login, router]
  );

  return (
    <Base header={<Header back title={t("signin.title")} />}>
      <SignInForm
        onSubmitData={onSubmit}
        isLoading={isLoading}
        onSuccess={isSubmitted}
      />
    </Base>
  );
};

export default SignInPage;
