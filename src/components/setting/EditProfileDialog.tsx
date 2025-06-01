"use client";
import MDialog from "@/components/m-ui/m-dialog";
import EditProfileForm from "./EditProfileForm";
import MButton from "@/components/m-ui/m-button";
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
      content={<EditProfileForm />}
      open={open}
      onOpenChange={onOpenChange}
      footer={
        <div className="flex items-center gap-2">
          <MButton
            preset="secondary"
            size="sm"
            className="w-full"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </MButton>
          <MButton preset="primary" size="sm" className="w-full">
            Save
          </MButton>
        </div>
      }
    />
  );
}
