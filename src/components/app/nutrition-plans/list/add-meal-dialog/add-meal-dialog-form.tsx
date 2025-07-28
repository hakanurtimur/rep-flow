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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { FormDateTimePicker } from "@/components/ui/custom-date-time-picker/form-date-time-picker";
import { MealType } from "@prisma/client";
import { useCreateMealInPlan } from "@/hooks/meal/use-create-meal";
import { z } from "zod";
import { Textarea } from "@/components/ui/textarea";
import { eventColorKeyEnum } from "@/zod-schemas/scheduled-workout-schemas";
import { eventColorMap } from "@/lib/event-color-map";

interface Props {
  date: string;
  closeDialog: () => void;
}

const FormSchema = z.object({
  datetime: z.date(),
  type: z.enum(["BREAKFAST", "LUNCH", "DINNER", "SNACK"]),
  description: z.string().optional().nullable(),
  colorKey: eventColorKeyEnum.optional(),
});

const AddMealDialogForm = ({ closeDialog, date }: Props) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      datetime: new Date(date),
    },
  });

  const mutation = useCreateMealInPlan({
    onSuccess: () => {
      toast("Meal created successfully!");
      closeDialog();
    },
  });

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((values) => {
            const datetime = values.datetime;

            const dateOnly = new Date(datetime);
            dateOnly.setHours(0, 0, 0, 0);

            mutation.mutate({
              date: dateOnly,
              time: datetime,
              type: values.type,
              description: values.description,
              colorKey: values.colorKey,
            });
          })}
          className="space-y-4"
        >
          <FormDateTimePicker
            label={"Select Date & Time"}
            control={form.control}
            name={"datetime"}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Additional Notes (Optional)</FormLabel>
                <FormControl>
                  <Textarea rows={3} {...field} value={field.value ?? ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select A Meal Type</FormLabel>
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
                    {Object.entries(MealType).map(([key, value]) => (
                      <SelectItem key={key} value={key}>
                        {value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
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

export default AddMealDialogForm;
