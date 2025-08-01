import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import MotionContainerXWithDirection from "@/components/motioned-components/motion-container-x-with-direction";
import MotionXWithDirection from "@/components/motioned-components/motion-container-x-with-direction";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { EditIcon, Trash2Icon, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMemo } from "react";
import { useGetFood } from "@/hooks/food/use-get-food";
import z from "zod";

interface Props {
  mealFood: {
    id?: string;
    food: {
      id: string;
    };
    amount: number;
  };
  isEditing: boolean;
  onChangeEditingId: (id: string | null) => void;
  onSubmit: (data: {
    food: {
      id: string;
    };
    amount: number;
  }) => void;
  onDelete?: (id: string) => void;
}

const FormSchema = z.object({
  amount: z.number(),
  food: z.object({
    id: z.string(),
  }),
});

const MealDetailsEditItem = ({
  mealFood,
  isEditing,
  onChangeEditingId,
  onSubmit,
  onDelete,
}: Props) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      amount: mealFood.amount ?? 0,
      food: {
        id: mealFood.food.id,
      },
    },
  });

  const amount = form.watch("amount") ?? 0;

  const { data: food, isLoading } = useGetFood(mealFood.food.id);

  const macros = useMemo(
    () => ({
      protein: ((food?.protein ?? 0) / 100) * amount,
      carbs: ((food?.carbs ?? 0) / 100) * amount,
      fat: ((food?.fat ?? 0) / 100) * amount,
      calories: ((food?.calories ?? 0) / 100) * amount,
    }),
    [food, amount],
  );

  return (
    <TooltipProvider>
      <MotionContainerXWithDirection
        direction="left"
        key={mealFood.id ?? `meal-${mealFood.food.id}`}
      >
        <Card className={cn(!isEditing && "bg-bg")}>
          <CardHeader className="flex flex-row justify-end gap-2">
            {!isEditing ? (
              <>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      onClick={() => onChangeEditingId(mealFood.food.id!)}
                      size="icon"
                      variant="ghost"
                    >
                      <EditIcon />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Edit Meal</TooltipContent>
                </Tooltip>
                {onDelete && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        onClick={() => onDelete(mealFood.food.id!)}
                        size="icon"
                        variant="ghost"
                        className="text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                      >
                        <Trash2Icon />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Delete Meal</TooltipContent>
                  </Tooltip>
                )}
              </>
            ) : (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={() => onChangeEditingId(null)}
                    size="icon"
                    variant="ghost"
                    className="text-destructive hover:bg-destructive/10"
                  >
                    <X />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Cancel Editing</TooltipContent>
              </Tooltip>
            )}
          </CardHeader>

          <CardContent>
            {isLoading ? (
              <div className="p-4 text-sm text-muted-foreground">
                Loading food details...
              </div>
            ) : !food ? (
              <div className="p-4 text-sm text-destructive">
                Food not found.
              </div>
            ) : (
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit((data) => {
                    onSubmit(data);
                    onChangeEditingId(null);
                  })}
                  className="flex flex-col gap-4"
                >
                  {/* Top Row: Name + Amount + Macros */}
                  <div className="grid grid-cols-8 gap-4">
                    <FormItem className="col-span-3">
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input disabled value={food.name} />
                      </FormControl>
                    </FormItem>

                    <FormField
                      control={form.control}
                      name="amount"
                      render={({ field }) => (
                        <FormItem className="col-span-1">
                          <FormLabel>Amount (g)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              disabled={!isEditing}
                              {...field}
                              onChange={(e) => {
                                const val = e.target.value;
                                field.onChange(val === "" ? 0 : Number(val));
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormItem className="col-span-1">
                      <FormLabel>Protein (g)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          disabled
                          value={macros.protein.toFixed(1)}
                        />
                      </FormControl>
                    </FormItem>

                    <FormItem className="col-span-1">
                      <FormLabel>Carbs (g)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          disabled
                          value={macros.carbs.toFixed(1)}
                        />
                      </FormControl>
                    </FormItem>

                    <FormItem className="col-span-1">
                      <FormLabel>Fat (g)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          disabled
                          value={macros.fat.toFixed(1)}
                        />
                      </FormControl>
                    </FormItem>

                    <FormItem className="col-span-1">
                      <FormLabel>Calories (kcal)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          disabled
                          value={macros.calories.toFixed(1)}
                        />
                      </FormControl>
                    </FormItem>
                  </div>

                  {/* Bottom Row: Static Nutrients */}
                  {isEditing && (
                    <MotionXWithDirection
                      direction="left"
                      className="grid grid-cols-8 gap-4"
                    >
                      <div className="col-span-4"></div>

                      <FormItem className="col-span-1">
                        <FormLabel>Per 100g Protein</FormLabel>
                        <FormControl>
                          <Input type="number" disabled value={food.protein} />
                        </FormControl>
                      </FormItem>

                      <FormItem className="col-span-1">
                        <FormLabel>Per 100g Carbs</FormLabel>
                        <FormControl>
                          <Input type="number" disabled value={food.carbs} />
                        </FormControl>
                      </FormItem>

                      <FormItem className="col-span-1">
                        <FormLabel>Per 100g Fat</FormLabel>
                        <FormControl>
                          <Input type="number" disabled value={food.fat} />
                        </FormControl>
                      </FormItem>

                      <FormItem className="col-span-1">
                        <FormLabel>Per 100g Cal</FormLabel>
                        <FormControl>
                          <Input type="number" disabled value={food.calories} />
                        </FormControl>
                      </FormItem>
                    </MotionXWithDirection>
                  )}

                  {isEditing && (
                    <div className="flex justify-end">
                      <Button type="submit">Save</Button>
                    </div>
                  )}
                </form>
              </Form>
            )}
          </CardContent>
        </Card>
      </MotionContainerXWithDirection>
    </TooltipProvider>
  );
};

export default MealDetailsEditItem;
