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
import CreateScheduledWorkoutDialogForm from "@/components/app/workouts/scheduled/create-scheduled-workout-dialog/create-scheduled-workout-dialog-form";

interface Props {
  children?: React.ReactNode;
}

export default function CreateScheduledWorkoutDialog({ children }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Create a Scheduled Workout</DialogTitle>
          <DialogDescription>Create a Scheduled Workout</DialogDescription>
        </DialogHeader>
        <CreateScheduledWorkoutDialogForm closeDialog={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
