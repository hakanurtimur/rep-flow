import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import React from "react";
import { Button } from "@/components/ui/button";

interface Props {
  onDelete: () => void;
  children: React.ReactNode;
  title: string;
  description: string;
  disabled: boolean;
  loading: boolean;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function DeleteAlertDialog({
  onDelete,
  children,
  title,
  description,
  disabled,
  loading,
  isOpen,
  onOpenChange,
}: Props) {
  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={disabled}>Cancel</AlertDialogCancel>
          <Button loading={loading} disabled={disabled} onClick={onDelete}>
            Continue
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
