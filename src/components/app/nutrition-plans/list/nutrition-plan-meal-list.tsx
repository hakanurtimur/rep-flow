import MotionContainerY from "@/components/motioned-components/motion-container-y";
import { ExtendedNutritionPlan } from "@/zod-schemas/nutrition-plan-schemas";
import NutritionPlanEmptyCard from "@/components/app/nutrition-plans/list/nutrition-plan-empty-card";
import NutritionPlanMealListItem from "@/components/app/nutrition-plans/list/nutrition-plan-meal-list-item";

interface Props {
  nutritionPlan?: ExtendedNutritionPlan | null;
}

const WorkoutList = ({ nutritionPlan }: Props) => {
  return (
    <>
      {nutritionPlan && nutritionPlan.meals.length > 0 ? (
        <MotionContainerY key={"card"} className="grid grid-cols-3 gap-4">
          {nutritionPlan.meals.map((meal) => (
            <NutritionPlanMealListItem key={meal.id} meal={meal} />
          ))}
        </MotionContainerY>
      ) : (
        <MotionContainerY key={"button"}>
          <NutritionPlanEmptyCard />
        </MotionContainerY>
      )}
    </>
  );
};

export default WorkoutList;
