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
import AddExerciseDialogForm from "@/components/app/workouts/templates/shared/exercise-drag-drop/add-exercise-dialog/add-exercise-dialog-form";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  exerciseToAdd: ExerciseTemplateForDragDrop;
  onCancel: () => void;
  onConfirm: (data: ExerciseForTemplateInput) => void;
  children?: React.ReactNode;
}

const AddExerciseDialog = ({
  open,
  onOpenChange,
  exerciseToAdd,
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
      <DialogContent className="sm:max-w-3xl min-h-[500px]">
        <DialogHeader>
          <DialogTitle>Refactoring Exercise</DialogTitle>
          <DialogDescription>Refactor exercise from here.</DialogDescription>
        </DialogHeader>
        <AddExerciseDialogForm
          model={exerciseToAdd}
          onClose={() => {
            onOpenChange(false);
          }}
          onConfirm={onConfirm}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AddExerciseDialog;
