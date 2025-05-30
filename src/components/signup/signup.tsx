"use client";

import MButton from "@/components/m-ui/m-button";
import Image from "next/image";
import googleIcon from "../../../public/assets/icon/google.svg";
import { Separator } from "@/components/ui/separator";
import MInput from "@/components/m-ui/m-input";
import MInputPassword from "@/components/m-ui/m-input-password";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
export const wrapper = (props: any) => {
  return (
    <div className="flex w-full items-center justify-center  ">
      <div className="flex flex-col  justify-center items-center bg-white rounded-2xl shadow-lg max-w-[600px] w-full h-full gap-10 p-10 ">
        {props.children}
      </div>
    </div>
  );
};

export default function SignUp() {
  const t = useTranslation();
  const router = useRouter();
  return (
    <div className="flex flex-col  justify-center items-center bg-white rounded-2xl shadow-lg max-w-[600px] w-full h-full gap-10 p-10 ">
      <div className="flex w-full flex-col gap-2">
        <p className="text-2xl font-bold font-roboto">{t.t("signup.title")}</p>
        <p className="text-sm text-gray-500">{t.t("signup.description")}</p>
      </div>
      <MButton
        preset="secondary"
        size="lg"
        className="w-full rounded-lg bg-transparent border border-gray-200 flex items-center justify-center gap-2"
      >
        <Image src={googleIcon} alt="google" width={30} height={20} />
        {t.t("signup.signup_with_google")}
      </MButton>
      <div className="flex w-1/2 justify-center items-center gap-2">
        <Separator className="w-1/2" />
        <span className="text-sm text-gray-500">{t.t("common.or")}</span>
        <Separator className="w-1/2" />
      </div>
      <div className="flex w-full flex-col gap-4">
        <p className="text-sm text-gray-500">
          {t.t("signup.or_continue_with")}
        </p>
        <MInput
          rounded
          required
          label="Name"
          placeholder="Name"
          type="text"
          onChange={(e) => {
            console.log(e.target.value);
          }}
        />
        <MInput
          required
          label="Email"
          placeholder="Email"
          type="email"
          rounded
        />
        <MInputPassword
          required
          label="Password"
          placeholder="Password"
          onChange={(e) => {
            console.log(e.target.value);
          }}
        />
        <MInputPassword
          required
          label="Confirm Password"
          placeholder="Confirm Password"
          onChange={(e) => {
            console.log(e.target.value);
          }}
        />
      </div>
      <MButton
        onClick={() => {
          router.push("/dashboard");
        }}
        preset="primary"
        size="lg"
        className="w-full rounded-full shadow-lg shadow-gray-200"
      >
        <span>{t.t("signup.button")}</span>
      </MButton>
    </div>
  );
}
