"use client";
import MInputPassword from "@/components/m-ui/m-input-password";

export default function ChangePasswordForm() {
  return (
    <div className="flex flex-col gap-6">
      <MInputPassword placeholder="Current Password" required />
      <MInputPassword placeholder="New Password" required />
      <MInputPassword placeholder="Confirm Password" required />
    </div>
  );
}
