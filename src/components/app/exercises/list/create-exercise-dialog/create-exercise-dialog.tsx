import CreateExerciseDialogForm from "@/components/app/exercises/list/create-exercise-dialog/create-exercise-dialog-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";

interface Props {
  children?: React.ReactNode;
}

const CreateExerciseDialog = ({ children }: Props) => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create Exercise</DialogTitle>
          <DialogDescription>Create a new exercise.</DialogDescription>
        </DialogHeader>
        <CreateExerciseDialogForm onClose={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};

export default CreateExerciseDialog;
