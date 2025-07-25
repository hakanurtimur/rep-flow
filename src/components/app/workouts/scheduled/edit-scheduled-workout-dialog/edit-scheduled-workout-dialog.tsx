"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { UpdateScheduledWorkoutInput } from "@/zod-schemas/scheduled-workout-schemas";
import EditScheduledWorkoutDialogForm from "@/components/app/workouts/scheduled/edit-scheduled-workout-dialog/edit-scheduled-workout-dialog-form";

interface Props {
  children?: React.ReactNode;
  model: UpdateScheduledWorkoutInput;
}

export default function EditScheduledWorkoutDialog({ children, model }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit Scheduled Workout</DialogTitle>
          <DialogDescription>Edit the scheduled workout</DialogDescription>
        </DialogHeader>
        <EditScheduledWorkoutDialogForm
          model={model}
          closeDialog={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
