import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MealWithDetails } from "@/zod-schemas/meal-schemas";
import MotionContainerY from "@/components/motioned-components/motion-container-y";

interface Props {
  meal: MealWithDetails;
}

const MealDetailsPreview = ({ meal }: Props) => {
  return (
    <MotionContainerY key={"preview"} className="flex flex-col gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center">
          <div className="flex-1 flex-col gap-4">
            <CardTitle>{meal.type}</CardTitle>
            <CardDescription>{meal.description}</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          {!meal.mealFood || meal.mealFood.length === 0 ? (
            <p className="text-sm ">No foods added yet</p>
          ) : (
            meal.mealFood.map((mf) => mf.food.name)
          )}
        </CardContent>
      </Card>
    </MotionContainerY>
  );
};

export default MealDetailsPreview;
