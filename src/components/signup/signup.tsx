"use client";

import MButton from "@/components/m-ui/m-button";
import Image from "next/image";
import googleIcon from "../../../public/assets/icon/google.svg";
import { Separator } from "@/components/ui/separator";
import MInput from "@/components/m-ui/m-input";
import MInputPassword from "@/components/m-ui/m-input-password";
import { FileText, Shield, Brain, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import clsx from "clsx";
export default function SignUp() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const screen = window.innerWidth;
    setIsMobile(screen < 768);
  }, []);
  return (
    <div className="flex w-full h-full">
      <div
        className={clsx(
          "flex flex-col w-1/3 p-base h-full gap-10 p-10",
          isMobile && "w-full"
        )}
      >
        <div className="flex flex-col gap-2">
          <p className="text-2xl font-bold">Create account</p>
          <p className="text-sm text-gray-500">
            Enter your credentials to create your account!
          </p>
        </div>
        <MButton
          preset="secondary"
          size="lg"
          className="w-full rounded-lg bg-transparent border border-gray-200 flex items-center justify-center gap-2"
        >
          <Image src={googleIcon} alt="google" width={30} height={20} />
          Continue with Google
        </MButton>
        <Separator className="w-50" />
        <div className="flex flex-col gap-4">
          <p className="text-sm text-gray-500">Or continue with</p>
          <MInput
            required
            label="Name"
            placeholder="Name"
            type="text"
            onChange={(e) => {
              console.log(e.target.value);
            }}
          />
          <MInput required label="Email" placeholder="Email" type="email" />
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
          preset="primary"
          size="lg"
          className="w-full rounded-full shadow-lg shadow-gray-200"
        >
          <span>Create account</span>
        </MButton>
      </div>
      {!isMobile && (
        <div className="w-2/3 relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 dark:from-indigo-900 dark:via-purple-900 dark:to-pink-900 flex items-center justify-center">
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-black/40 backdrop-blur-sm" />

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center text-center px-8">
            <div className="flex items-center gap-3 mb-6">
              <Brain className="h-8 w-8 text-white" />
              <h1 className="text-4xl font-bold text-white">FileManager AI</h1>
            </div>
            <p className="text-xl text-white/90 mb-12 max-w-lg">
              Experience the future of file management powered by advanced AI
              technology
            </p>

            {/* Feature Icons */}
            <div className="grid grid-cols-3 gap-8 mt-8">
              <div className="flex flex-col items-center gap-3">
                <div className="p-4 rounded-full bg-white/10 backdrop-blur-sm">
                  <FileText className="h-6 w-6 text-white" />
                </div>
                <span className="text-white/90 text-sm">
                  Smart Organization
                </span>
              </div>
              <div className="flex flex-col items-center gap-3">
                <div className="p-4 rounded-full bg-white/10 backdrop-blur-sm">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <span className="text-white/90 text-sm">Secure Storage</span>
              </div>
              <div className="flex flex-col items-center gap-3">
                <div className="p-4 rounded-full bg-white/10 backdrop-blur-sm">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <span className="text-white/90 text-sm">Lightning Fast</span>
              </div>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
            <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-white/5 rounded-full blur-3xl" />
            <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-white/5 rounded-full blur-3xl" />
          </div>
        </div>
      )}
    </div>
  );
}
