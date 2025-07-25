"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  CreateScheduledWorkoutInput,
  CreateScheduledWorkoutSchema,
} from "@/zod-schemas/scheduled-workout-schemas";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { eventColorMap } from "@/lib/event-color-map";
import { useCreateScheduledWorkout } from "@/hooks/scheduled-workout/use-create-scheduled-workout";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { FormDateTimePicker } from "@/components/ui/custom-date-time-picker/form-date-time-picker";
import { ComboboxFormSingle } from "@/components/ui/combobox-form-single";
import { useListWorkoutOptions } from "@/hooks/workout/use-list-workout-options";

interface Props {
  closeDialog: () => void;
}

const CreateScheduledWorkoutDialogForm = ({ closeDialog }: Props) => {
  const router = useRouter();
  const form = useForm<CreateScheduledWorkoutInput>({
    resolver: zodResolver(CreateScheduledWorkoutSchema),
    defaultValues: {},
  });

  const workoutOptionsQuery = useListWorkoutOptions();

  const mutation = useCreateScheduledWorkout({
    onSuccess: () => {
      toast("Workout scheduled successfully!");
      closeDialog();
      router.push("/workouts/scheduled");
    },
  });

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => {
            mutation.mutate(data);
          })}
          className="space-y-4"
        >
          <ComboboxFormSingle
            form={form}
            name={`workoutId`}
            label="Workout"
            options={workoutOptionsQuery.data}
            valueField="id"
            labelField="name"
          />

          <FormDateTimePicker
            label={"Select Date"}
            control={form.control}
            name={"scheduledAt"}
          />
          <FormField
            control={form.control}
            name="colorKey"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select An Event Color</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-36">
                      <SelectValue placeholder="Select color" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="w-44">
                    {Object.entries(eventColorMap).map(([key, value]) => (
                      <SelectItem key={key} value={key}>
                        <span
                          className="h-4 w-[9.5rem] rounded-sm border"
                          style={{ backgroundColor: `var(${value.bg})` }}
                        />
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <DialogFooter
            className={cn("flex flex-row! items-center gap-2 w-full")}
          >
            <DialogClose type="button" asChild>
              <Button variant="outline" disabled={mutation.isPending}>
                Cancel
              </Button>
            </DialogClose>
            <Button loading={mutation.isPending} type="submit">
              Save
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </>
  );
};

export default CreateScheduledWorkoutDialogForm;
