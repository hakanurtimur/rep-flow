"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  CreateScheduledWorkoutInput,
  CreateScheduledWorkoutSchema,
} from "@/zod-schemas/scheduled-workout-schemas";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
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

interface Props {
  workoutId: string;
  closeDialog: () => void;
}

const ScheduleWorkoutDialogForm = ({ closeDialog, workoutId }: Props) => {
  const form = useForm<CreateScheduledWorkoutInput>({
    resolver: zodResolver(CreateScheduledWorkoutSchema),
    defaultValues: {
      workoutId: workoutId,
    },
  });

  const mutation = useCreateScheduledWorkout({
    onSuccess: () => {
      toast("Workout scheduled successfully!");
      closeDialog();
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
          <FormField
            control={form.control}
            name="scheduledAt"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date of birth</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={
                        typeof field.value === "string"
                          ? new Date(field.value)
                          : field.value
                      }
                      onSelect={(date) => field.onChange(date?.toISOString())}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      captionLayout="dropdown"
                    />
                  </PopoverContent>
                </Popover>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="colorKey"
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
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

export default ScheduleWorkoutDialogForm;
