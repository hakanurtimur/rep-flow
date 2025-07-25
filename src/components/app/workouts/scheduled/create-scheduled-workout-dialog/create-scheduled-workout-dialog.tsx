"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CreateScheduledWorkoutDialogForm from "@/components/app/workouts/scheduled/create-scheduled-workout-dialog/create-scheduled-workout-dialog-form";

interface Props {
  children?: React.ReactNode;
  open: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export default function CreateScheduledWorkoutDialog({
  children,
  open,
  onOpenChange,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Create a Scheduled Workout</DialogTitle>
          <DialogDescription>Create a Scheduled Workout</DialogDescription>
        </DialogHeader>
        <CreateScheduledWorkoutDialogForm
          closeDialog={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
