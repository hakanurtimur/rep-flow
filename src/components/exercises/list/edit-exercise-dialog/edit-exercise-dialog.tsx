import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { useGetExercise } from "@/hooks/exercise/use-get-exercise";
import EditExerciseDialogForm from "@/components/exercises/list/edit-exercise-dialog/edit-exercise-dialog-form";
import { Loader2 } from "lucide-react";

interface Props {
  children?: React.ReactNode;
  id: string;
}

const EditExerciseDialog = ({ children, id }: Props) => {
  const [open, setOpen] = useState(false);

  const query = useGetExercise(id, open);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Exercise</DialogTitle>
          <DialogDescription>
            You can edit exercise from here.
          </DialogDescription>
        </DialogHeader>
        {query.data ? (
          <EditExerciseDialogForm
            model={query.data}
            onClose={() => {
              setOpen(false);
            }}
          />
        ) : (
          <div className="flex w-full items-center justify-center">
            <Loader2 className="animate-spin w-4 h-4"></Loader2>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EditExerciseDialog;
