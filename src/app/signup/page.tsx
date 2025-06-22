"use client";
import Header from "@/components/share/header";
import SignUpForm from "@/components/auth/SignUp-Form";
import { useTranslation } from "react-i18next";
import { Base } from "@/components/share/base";
import { useSignUpMutation } from "@/redux/slices/auth-slice";
import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useAuth } from "@/provider/AuthProvider";

export default function SignupPage() {
  const { t } = useTranslation();
  const [signUp, { isLoading }] = useSignUpMutation();
  const router = useRouter();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { login } = useAuth();

  const onSubmit = useCallback(
    async (data: any) => {
      try {
        const response = await signUp(data).unwrap();
        if (response.status !== true) {
          throw new Error(response.message || "Something went wrong");
        }
        login(response.token || "", response.data?.id);
        toast.success(response.message || "Account created successfully!");
        setIsSubmitted(true);
        router.push("/dashboard");
      } catch (error) {
        console.error(error);
      }
    },
    [signUp]
  );

  return (
    <Base header={<Header back title={t("signup.title")} />}>
      <SignUpForm
        onSubmit={onSubmit}
        isLoading={isLoading}
        onSuccess={isSubmitted}
      />
    </Base>
  );
}
