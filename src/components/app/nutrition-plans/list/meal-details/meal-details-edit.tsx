import {
  MealWithDetails,
  UpdateMealInput,
  UpdateMealInputSchema,
} from "@/zod-schemas/meal-schemas";
import { FoodInput } from "@/zod-schemas/food-schemas";
import { MealType } from "@prisma/client";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import AddFoodDialog from "@/components/app/nutrition-plans/list/add-food-dialog/add-food-dialog";
import MealDetailsEditItem from "@/components/app/nutrition-plans/list/meal-details/meal-details-edit-item";
import MotionContainerY from "@/components/motioned-components/motion-container-y";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { useUpdateMeal } from "@/hooks/meal/use-update-meal";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { FormDateTimePicker } from "@/components/ui/custom-date-time-picker/form-date-time-picker";
import { eventColorMap } from "@/lib/event-color-map";

interface Props {
  meal: MealWithDetails;
}

const MealDetailsEdit = ({ meal }: Props) => {
  const router = useRouter();

  console.log(meal);
  const form = useForm<UpdateMealInput>({
    resolver: zodResolver(UpdateMealInputSchema),
    defaultValues: {
      id: meal.id,
      type: meal.type as MealType,
      time: meal.time,
      description: meal.description,
      colorKey: meal.calendarEvent.colorKey,
      mealFoods: meal.mealFood
        ? meal.mealFood.map((mf) => {
            return {
              amount: mf.amount,
              food: {
                id: mf.food.id,
              },
            };
          })
        : [],
    },
  });

  const mutation = useUpdateMeal({
    onSuccess: () => {
      toast("Meal updated successfully.");
      router.push("/nutrition-plans/list");
    },
  });

  const [editingId, setEditingId] = useState<string | null>(null);

  const handleAddFood = (food: FoodInput) => {
    const newMealFood = {
      food: {
        id: food.id ?? "",
      },
      amount: 0,
    };

    const prevFoods = form.getValues("mealFoods") || [];

    const updatedFoods = [
      ...prevFoods.filter((f) => f.food.id !== food.id),
      newMealFood,
    ];

    form.setValue("mealFoods", updatedFoods);
    setEditingId(newMealFood.food.id);
  };

  const handleUpdateFood = (updated: {
    amount: number;
    food: {
      id: string;
    };
  }) => {
    const current = form.getValues("mealFoods") || [];
    const updatedFoods = current.map((mf) =>
      mf.food.id === updated.food.id ? updated : mf,
    );
    form.setValue("mealFoods", updatedFoods);
  };

  const handleDeleteFood = (id: string) => {
    const current = form.getValues("mealFoods");
    form.setValue(
      "mealFoods",
      current.filter((mf) => mf.food.id !== id),
    );
  };

  return (
    <MotionContainerY key="edit" className="flex flex-col gap-6">
      <Form {...form}>
        <form className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Meal Details</h3>
          </div>

          <FormDateTimePicker
            label={"Select Date & Time"}
            control={form.control}
            className="w-32"
            name={"time"}
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
                  defaultValue={field.value ?? undefined}
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

          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Meal Type</FormLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
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
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Notes (Optional)</FormLabel>
                <FormControl>
                  <Textarea rows={3} {...field} value={field.value ?? ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
      <Separator />
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Food List</h3>
        <AddFoodDialog onSubmit={handleAddFood}>
          <Button variant="tertiary" type="button">
            Add Food
          </Button>
        </AddFoodDialog>
      </div>

      <div className="flex flex-col gap-4 max-h-[300px] min-h-[300px] overflow-y-scroll">
        {form.watch("mealFoods")?.length > 0 ? (
          form.watch("mealFoods")?.map((mf, index) => (
            <div key={mf.food.id ?? index} className="flex flex-col gap-6">
              <MealDetailsEditItem
                isEditing={editingId === mf.food.id}
                onChangeEditingId={setEditingId}
                mealFood={mf}
                onSubmit={handleUpdateFood}
                onDelete={handleDeleteFood}
              />
            </div>
          ))
        ) : (
          <p className="text-muted-foreground text-sm">No foods added yet</p>
        )}
      </div>
      <div className="flex items-center justify-end">
        <Button onClick={form.handleSubmit((data) => mutation.mutate(data))}>
          Save Meal
        </Button>
      </div>
    </MotionContainerY>
  );
};

export default MealDetailsEdit;
