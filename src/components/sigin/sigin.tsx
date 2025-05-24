"use client";

import MButton from "../m-ui/m-button";
import Image from "next/image";
import googleIcon from "../../../public/assets/icon/google.svg";
import MInput from "../m-ui/m-input";
import MInputPassword from "../m-ui/m-input-password";
import Link from "next/link";

export default function SignIn() {
  return (
    <div className="flex flex-col bg-white rounded-2xl shadow-lg max-w-[600px] w-full h-full gap-10 p-10 ">
      <div className="flex w-full flex-col gap-2">
        <p className="text-2xl font-bold font-roboto">Sign In</p>
        <p className="text-sm text-gray-500">
          Enter your credentials to sign in!
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
      <div className="flex w-full flex-col gap-4">
        <p className="text-sm text-gray-500">Or continue with</p>
        <MInput required label="Email" placeholder="Email" type="email" />
        <MInputPassword
          required
          label="Password"
          placeholder="Password"
          onChange={(e) => {
            console.log(e.target.value);
          }}
        />
      </div>
      <div className="flex w-full justify-between">
        <p className="text-sm flex text-gray-500 gap-2">
          Don't have an account?{" "}
          <Link href="/signup" className="text-blue-500">
            Sign up
          </Link>
        </p>
        <p className="text-sm text-gray-500">Forgot password?</p>
      </div>
      <MButton
        preset="primary"
        size="lg"
        className="w-full rounded-full shadow-lg shadow-gray-200"
      >
        <span>Sign In</span>
      </MButton>
    </div>
  );
}
