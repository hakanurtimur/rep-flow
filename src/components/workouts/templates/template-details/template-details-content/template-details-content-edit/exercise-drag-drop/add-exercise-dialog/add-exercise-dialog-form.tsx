"use client";

import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRef } from "react";
import {
  ExerciseForTemplateInput,
  ExerciseForTemplateSchema,
  ExerciseTemplateForDragDrop,
} from "@/zod-schemas/template-exercise-schemas";
import { Button } from "@/components/ui/button";
import MotionXWithDirection from "@/components/motioned-components/motion-container-x-with-direction";
import { Input } from "@/components/ui/input";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { z } from "zod";
import { X } from "lucide-react";

interface Props {
  model: ExerciseTemplateForDragDrop;
  onClose: () => void;
  onConfirm: (data: ExerciseForTemplateInput) => void;
}

const AdjustedExerciseForTemplateSchema = ExerciseForTemplateSchema.extend({
  sets: ExerciseForTemplateSchema.shape.sets.min(1),
});

const AddExerciseDialogForm = ({ model, onClose, onConfirm }: Props) => {
  const form = useForm<z.infer<typeof AdjustedExerciseForTemplateSchema>>({
    resolver: zodResolver(AdjustedExerciseForTemplateSchema),
    defaultValues: {
      id: model.id,
      exerciseId: model.exerciseId,
      order: 1,
    },
    mode: "onChange",
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "sets",
  });

  const ref = useRef<HTMLDivElement>(null);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => {
          onClose();
          onConfirm(data);
        })}
        className="space-y-4 px-4"
      >
        <div
          key={"muscleGroups"}
          className="space-y-4 max-h-[40rem] overflow-x-visible! overflow-y-scroll h-[40rem]"
          ref={ref}
        >
          <div className="sticky top-0 left-0 w-full bg-background pb-4 z-10">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                append({
                  reps: 0,
                  weight: 0,
                  duration: 0,
                  restTime: 0,
                  order: 0,
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
              + Add Set
            </Button>
            <span className="text-sm text-destructive ml-2">
              {form.formState.errors.sets && form.formState.errors.sets.message}
            </span>
          </div>
          {fields.map((field, index) => (
            <MotionXWithDirection
              direction="left"
              className="grid grid-cols2 gap-4 relative p-4 shadow-sm rounded-md border border-border"
              key={field.id}
            >
              <div className="flex gap-2 items-center justify-between col-span-2">
                <p className="text-sm font-semibold">Set {index + 1}:</p>

                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => {
                    remove(index);
                  }}
                  className="h-6 w-6 p-0 hover:bg-destructive/10 hover:text-destructive cursor-pointer"
                  size="sm"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              {/* Reps */}
              <FormField
                control={form.control}
                name={`sets.${index}.reps`}
                render={({ field }) => (
                  <FormItem className="flex flex-col flex-1 col-span-1">
                    <FormLabel>Reps</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        value={
                          field.value === null || field.value === undefined
                            ? ""
                            : field.value
                        }
                        onChange={(e) => {
                          const val = e.target.value;
                          field.onChange(val === "" ? null : Number(val));
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Weight */}
              <FormField
                control={form.control}
                name={`sets.${index}.weight`}
                render={({ field }) => (
                  <FormItem className="flex flex-col flex-1 col-span-1">
                    <FormLabel>Weight</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        value={
                          field.value === null || field.value === undefined
                            ? ""
                            : field.value
                        }
                        onChange={(e) => {
                          const val = e.target.value;
                          field.onChange(val === "" ? null : Number(val));
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Duration */}
              <FormField
                control={form.control}
                name={`sets.${index}.duration`}
                render={({ field }) => (
                  <FormItem className="flex flex-col flex-1 col-span-1">
                    <FormLabel>Duration (seconds)</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        value={
                          field.value === null || field.value === undefined
                            ? ""
                            : field.value
                        }
                        onChange={(e) => {
                          const val = e.target.value;
                          field.onChange(val === "" ? null : Number(val));
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Rest Time */}
              <FormField
                control={form.control}
                name={`sets.${index}.restTime`}
                render={({ field }) => (
                  <FormItem className="flex flex-col flex-1 col-span-1">
                    <FormLabel>Rest Time(seconds)</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        value={
                          field.value === null || field.value === undefined
                            ? ""
                            : field.value
                        }
                        onChange={(e) => {
                          const val = e.target.value;
                          field.onChange(val === "" ? null : Number(val));
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </MotionXWithDirection>
          ))}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <Button variant="default" type="submit">
            Save
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default AddExerciseDialogForm;
