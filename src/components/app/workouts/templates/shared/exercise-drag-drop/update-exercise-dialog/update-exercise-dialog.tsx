import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  ExerciseForTemplateInput,
  ExerciseTemplateForDragDrop,
} from "@/zod-schemas/template-exercise-schemas";
import UpdateExerciseDialogForm from "@/components/app/workouts/templates/shared/exercise-drag-drop/update-exercise-dialog/update-exercise-dialog-form";
import React from "react";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  exerciseToUpdate: ExerciseTemplateForDragDrop;
  onCancel: () => void;
  onConfirm: (data: ExerciseForTemplateInput) => void;
  children?: React.ReactNode;
}

const UpdateExerciseDialog = ({
  open,
  onOpenChange,
  exerciseToUpdate,
  onCancel,
  onConfirm,
  children,
}: Props) => {
  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        onOpenChange(open);
        if (!open) {
          onCancel();
        }
      }}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-2xl min-h-[500px]">
        <DialogHeader>
          <DialogTitle>Refactoring Exercise</DialogTitle>

          <DialogDescription>Refactor exercise from here.</DialogDescription>
        </DialogHeader>
        <UpdateExerciseDialogForm
          model={exerciseToUpdate}
          onClose={() => {
            onOpenChange(false);
          }}
          onConfirm={onConfirm}
        />
      </DialogContent>
    </Dialog>
  );
};

export default UpdateExerciseDialog;
