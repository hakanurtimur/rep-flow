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
  customError?: string;
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
  customError,
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
          {customError && (
            <p className="text-destructive text-sm">{customError}</p>
          )}
        </AlertDialogHeader>
        <AlertDialogFooter>
          {!customError && (
            <AlertDialogCancel disabled={disabled}>Cancel</AlertDialogCancel>
          )}
          {customError ? (
            <Button onClick={() => onOpenChange(false)} disabled={disabled}>
              OK
            </Button>
          ) : (
            <Button loading={loading} disabled={disabled} onClick={onDelete}>
              Continue
            </Button>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
