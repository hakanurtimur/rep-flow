"use client";

import { useFieldArray, useForm } from "react-hook-form";
import {
  CreateExerciseInput,
  CreateExerciseSchema,
} from "@/zod-schemas/exercise-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useListMuscleGroupOptions } from "@/hooks/muscle-group/use-list-muscle-group-options";
import { Slider } from "@/components/ui/slider";
import { WizardForm } from "@/components/ui/wizard-form/wizard-form";
import { CheckCircleIcon, FlameIcon, Trash2, TurtleIcon } from "lucide-react";
import { ComboboxFormSingle } from "@/components/ui/combobox-form-single";
import { Button } from "@/components/ui/button";
import { useRef } from "react";

import { cn } from "@/lib/utils";
import MotionXWithDirection from "@/components/motioned-components/motion-container-x-with-direction";
import { useCreateExercise } from "@/hooks/exercise/use-create-exercise";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Props {
  onClose: () => void;
}

const CreateExerciseDialogForm = ({ onClose }: Props) => {
  const form = useForm<CreateExerciseInput>({
    resolver: zodResolver(CreateExerciseSchema),
    defaultValues: {
      name: "",
      description: "",
      totalDifficulty: 1,
    },
    mode: "onChange",
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "muscleGroups",
  });

  const ref = useRef<HTMLDivElement>(null);

  const muscleGroupOptionsQuery = useListMuscleGroupOptions();

  const mutation = useCreateExercise({
    onSuccess: () => {
      toast("Exercise created succesfuly.");
      onClose();
    },
  });

  return (
    <>
      <WizardForm
        steps={[
          {
            id: 1,
            title: "Exercise Details",
            components: [
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
              />,
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
              />,
            ],
            fields: ["name", "description"],
            icon: <CheckCircleIcon className="w-4 h-4" />,
          },

          {
            id: 2,
            title: "Muscle Groups",
            components: [
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
              </div>,
            ],
            fields: ["muscleGroups"],
            icon: <CheckCircleIcon className="w-4 h-4" />,
          },
          {
            id: 3,
            title: "Difficulty Level",
            components: [
              <FormField
                key={"totalDifficulty"}
                control={form.control}
                name="totalDifficulty"
                render={({ field }) => (
                  <FormItem className="flex flex-col space-y-3">
                    <FormLabel>Exercise Difficulty</FormLabel>
                    <FormControl>
                      <div className="flex items-center gap-4">
                        <TurtleIcon
                          className={cn(
                            "text-blue-600 fill-blue-600 w-10 h-10 transition-opacity duration-300",
                            form.getValues("totalDifficulty") === 1 &&
                              "animate-bounce",
                          )}
                          style={{
                            opacity: `${(11 - form.getValues("totalDifficulty")) * 10}%`,
                          }}
                        />
                        <Slider
                          onValueChange={(value) => field.onChange(value[0])}
                          value={[field.value]}
                          min={1}
                          max={10}
                          step={1}
                          defaultValue={[1]}
                        />
                        <FlameIcon
                          className={cn(
                            "text-destructive fill-destructive w-10 h-10 transition-opacity duration-300",
                            form.getValues("totalDifficulty") === 10 &&
                              "animate-bounce",
                          )}
                          style={{
                            opacity: `${form.getValues("totalDifficulty") * 10}%`,
                          }}
                        />
                      </div>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />,
            ],
            fields: ["totalDifficulty"],
            icon: <CheckCircleIcon className="w-4 h-4" />,
          },
          {
            id: 4,
            title: "Details",
            components: [
              <Card key="Details" className="flex flex-col">
                <CardHeader>
                  <CardTitle className="text-lg">Exercise Summary</CardTitle>
                  <CardDescription className="mt-2 space-y-1">
                    <div>
                      <span className="font-semibold text-foreground">
                        Name:
                      </span>{" "}
                      {form.getValues("name") || "-"}
                    </div>
                    <div>
                      <span className="font-semibold text-foreground">
                        Description:
                      </span>{" "}
                      {form.getValues("description") || "-"}
                    </div>
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground font-medium">
                    Muscle Groups
                  </p>

                  {form.getValues("muscleGroups") !== undefined &&
                    form.getValues("muscleGroups").length !== 0 &&
                    muscleGroupOptionsQuery.data && (
                      <div className="space-y-2">
                        {form
                          .getValues("muscleGroups")
                          .map((muscleGroup, idx) => {
                            const group = muscleGroupOptionsQuery.data?.find(
                              (e) => e.id === muscleGroup.muscleGroupId,
                            );

                            return (
                              <div
                                key={`mg-${idx}`}
                                className="flex items-center justify-between rounded-md border px-3 py-2 bg-muted"
                              >
                                <div className="text-sm font-semibold text-foreground">
                                  {group?.name || "Unknown Group"}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  Difficulty:{" "}
                                  <span className="font-medium text-foreground">
                                    {muscleGroup.difficulty}/10
                                  </span>
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    )}
                </CardContent>
              </Card>,
            ],
            fields: [],
            icon: <CheckCircleIcon className="w-4 h-4" />,
          },
        ]}
        form={form}
        onSubmit={(values) => {
          console.log("triggered");
          mutation.mutate(values);
        }}
        onCancel={onClose}
        loading={mutation.isPending}
        className="min-h-[500px]"
      />
    </>
  );
};

export default CreateExerciseDialogForm;
