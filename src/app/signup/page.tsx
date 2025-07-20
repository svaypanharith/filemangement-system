"use client";

import SignUpForm from "@/components/auth/SignUp-Form";
import { useTranslation } from "react-i18next";
import { useSignUpMutation } from "@/redux/slices/auth-slice";
import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import { useAuth } from "@/provider/AuthProvider";
import { Base } from "@/components/share/base";

export default function SignupPage() {
  const { t } = useTranslation();
  const [signUp, { isLoading }] = useSignUpMutation();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { login } = useAuth();

  const onSubmit = useCallback(
    async (data: any) => {
      try {
        const response = await signUp(data).unwrap();
        if (response.status !== 200) {
          throw new Error(response.message || "Something went wrong");
        }
        login(response.access_token || "");
        toast.success(response.message || t("signup.signup_success"));
        setIsSubmitted(true);
      } catch (error:any) {
        toast.error(error.message || t("signup.signup_error"));
      }
    },
    [signUp]
  );

  return (
     <Base title={t("signup.title")}>
        <SignUpForm
          onSubmit={onSubmit}
          isLoading={isLoading}
          onSuccess={isSubmitted}
        />
     </Base>
  );
}
