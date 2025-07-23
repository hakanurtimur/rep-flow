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
import ScheduleWorkoutDialogForm from "@/components/app/workouts/list/schedule-workout-dialog/schedule-workout-dialog-form";

interface Props {
  workoutId: string;
  children?: React.ReactNode;
}

export default function ScheduleWorkoutDialog({ children, workoutId }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Schedule Workout</DialogTitle>
          <DialogDescription>Schedule a workout</DialogDescription>
        </DialogHeader>
        <ScheduleWorkoutDialogForm
          workoutId={workoutId}
          closeDialog={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
