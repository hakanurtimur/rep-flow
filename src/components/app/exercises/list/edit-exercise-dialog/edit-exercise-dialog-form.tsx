import { useFieldArray, useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import MotionXWithDirection from "@/components/motioned-components/motion-container-x-with-direction";
import { ComboboxFormSingle } from "@/components/ui/combobox-form-single";
import { FlameIcon, Trash2, TurtleIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";
import { useRef, useState } from "react";
import { useListMuscleGroupOptions } from "@/hooks/muscle-group/use-list-muscle-group-options";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ExtendedExercises,
  UpdateExerciseInput,
  UpdateExerciseSchema,
} from "@/zod-schemas/exercise-schemas";
import DeleteAlertDialog from "@/components/delete-alert-dialog";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import MotionContainerY from "@/components/motioned-components/motion-container-y";
import { useUpdateExercise } from "@/hooks/exercise/use-update-exercise";
import { toast } from "sonner";
import { useDeleteExercise } from "@/hooks/exercise/use-delete-exercise";

interface Props {
  model: ExtendedExercises;
  onClose: () => void;
}

const EditExerciseDialogForm = ({ model, onClose }: Props) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const form = useForm<UpdateExerciseInput>({
    resolver: zodResolver(UpdateExerciseSchema),
    defaultValues: {
      id: model.id,
      name: model.name,
      description: model.description ?? "",
      totalDifficulty: model.totalDifficulty,
      muscleGroups: model.muscleGroupLinks.map((mg) => {
        return {
          muscleGroupId: mg.muscleGroupId,
          difficulty: mg.difficulty,
        };
      }),
    },
  });
  const ref = useRef<HTMLDivElement>(null);
  const muscleGroupOptionsQuery = useListMuscleGroupOptions();
  const mutation = useUpdateExercise({
    onSuccess: () => {
      toast("Exercise updated succesfully.");
      onClose();
    },
  });

  const deleteMutation = useDeleteExercise({
    onSuccess: () => {
      toast("Exercise deleted successfully.");
      onClose();
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "muscleGroups",
  });
  return (
    <Form {...form}>
      <MotionContainerY>
        <form
          className="space-y-4"
          onSubmit={form.handleSubmit((data) => mutation.mutate(data))}
        >
          <FormField
            key="name"
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Exercise Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            key="description"
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <div
            key={"muscleGroups"}
            className="space-y-4 max-h-[260px] overflow-y-scroll"
            ref={ref}
          >
            <div className="sticky col-span-6 top-0 left-0 w-full bg-background pb-4 z-10">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  append({
                    muscleGroupId: "",
                    difficulty: 1,
                  });
                  setTimeout(() => {
                    if (ref.current) {
                      ref.current.scrollTo({
                        top: ref.current.offsetHeight,
                        behavior: "smooth",
                      });
                    }
                  }, 500);
                }}
              >
                + Add Muscle Group
              </Button>
              <span className="text-sm text-destructive ml-2">
                {form.formState.errors.muscleGroups &&
                  form.formState.errors.muscleGroups.message}
              </span>
            </div>
            {fields.map((field, index) => (
              <MotionXWithDirection
                direction="left"
                className="grid grid-cols-6 gap-2 relative"
                key={field.id}
              >
                {/* Muscle Group Select */}

                <div className="col-span-2">
                  <ComboboxFormSingle
                    form={form}
                    name={`muscleGroups.${index}.muscleGroupId`}
                    label="Muscle Group"
                    options={muscleGroupOptionsQuery.data}
                    valueField="id"
                    labelField="name"
                  />
                </div>

                {/* Difficulty */}
                <FormField
                  control={form.control}
                  name={`muscleGroups.${index}.difficulty`}
                  render={({ field }) => (
                    <FormItem className="flex flex-col flex-1 col-span-3">
                      <FormLabel>Difficulty</FormLabel>
                      <FormControl>
                        <div className="flex-1 flex gap-2">
                          <TurtleIcon
                            className={cn(
                              "text-blue-600 fill-blue-600 w-6 h-6 transition-opacity duration-300 mt-1.5",
                              form.getValues(
                                `muscleGroups.${index}.difficulty`,
                              ) === 1 && "animate-bounce",
                            )}
                            style={{
                              opacity: `${(11 - form.getValues(`muscleGroups.${index}.difficulty`)) * 10}%`,
                            }}
                          />
                          <Slider
                            defaultValue={[field.value || 1]}
                            min={1}
                            max={10}
                            step={1}
                            className="max-h-8"
                            onValueChange={(val) => field.onChange(val[0])}
                          />
                          <FlameIcon
                            className={cn(
                              "text-destructive fill-destructive w-6 h-6 transition-opacity duration-300 mt-1.5",
                              form.getValues(
                                `muscleGroups.${index}.difficulty`,
                              ) === 10 && "animate-bounce",
                            )}
                            style={{
                              opacity: `${form.getValues(`muscleGroups.${index}.difficulty`) * 10}%`,
                            }}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-end mt-6">
                  <Button
                    type="button"
                    variant="default"
                    onClick={() => {
                      remove(index);
                    }}
                    size="icon"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </MotionXWithDirection>
            ))}
          </div>
          <DialogFooter>
            <DialogClose type="button" asChild>
              <Button
                variant="outline"
                disabled={mutation.isPending || deleteMutation.isPending}
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              loading={mutation.isPending}
              disabled={deleteMutation.isPending}
              type="submit"
            >
              Save
            </Button>
            <DeleteAlertDialog
              title="Delete Muscle Group"
              description="Are you sure you want to delete this muscle group? This action cannot be undone."
              onDelete={() => {
                if (model) {
                  deleteMutation.mutate(model.id);
                }
              }}
              isOpen={isDeleteDialogOpen}
              onOpenChange={(open) => {
                setIsDeleteDialogOpen(open);
                if (!open) {
                  setTimeout(() => {
                    deleteMutation.reset();
                  }, 200);
                }
              }}
              disabled={mutation.isPending || deleteMutation.isPending}
              loading={deleteMutation.isPending}
              customError={deleteMutation.error?.message}
            >
              <Button
                disabled={mutation.isPending || deleteMutation.isPending}
                variant={"destructive"}
                type="button"
              >
                Delete
              </Button>
            </DeleteAlertDialog>
          </DialogFooter>
        </form>
      </MotionContainerY>
    </Form>
  );
};

export default EditExerciseDialogForm;
