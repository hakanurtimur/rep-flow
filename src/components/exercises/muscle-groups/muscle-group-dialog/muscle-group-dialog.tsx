"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import MuscleGroupDialogForm from "@/components/exercises/muscle-groups/muscle-group-dialog/muscle-group-dialog-form";
import { MuscleGroup } from "@prisma/client";
import { useState } from "react";

interface Props {
  variant: "edit" | "create";
  children?: React.ReactNode;
  model?: MuscleGroup;
}

export default function MuscleGroupDialog({ variant, children, model }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {variant === "edit" ? "Edit Muscle Group" : "Create Muscle Group"}
            </DialogTitle>
            <DialogDescription>
              {variant === "edit"
                ? "Edit the details of this muscle group. Click save when you're done."
                : "Add a new muscle group to your exercise database. Fill in the details below and click save when you're done."}
            </DialogDescription>
          </DialogHeader>
          <MuscleGroupDialogForm
            model={model}
            closeDialog={() => setOpen(false)}
            variant={variant}
          />
        </DialogContent>
      </form>
    </Dialog>
  );
}
