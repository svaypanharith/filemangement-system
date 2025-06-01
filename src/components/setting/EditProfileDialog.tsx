"use client";
import MDialog from "@/components/m-ui/m-dialog";
import EditProfileForm from "./EditProfileForm";

interface EditProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditProfileDialog({
  open,
  onOpenChange,
}: EditProfileDialogProps) {
  return (
    <MDialog
      header="Edit Profile"
      description="Edit your profile information"
      content={
        <EditProfileForm
          onCancel={() => onOpenChange(false)}
          onSave={() => onOpenChange(false)}
        />
      }
      open={open}
      onOpenChange={onOpenChange}
    />
  );
}
