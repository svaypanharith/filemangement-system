"use client";
import MInput from "@/components/m-ui/m-input";

export default function EditProfileForm() {
  return (
    <div className="flex flex-col gap-4 w-full">
      <MInput label="Name" type="text" />
      <MInput label="Email" type="email" />
    </div>
  );
}
