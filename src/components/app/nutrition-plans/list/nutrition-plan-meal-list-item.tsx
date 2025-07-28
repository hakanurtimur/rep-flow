import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CalendarIcon, ClockIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { MealForNutritionPlan } from "@/zod-schemas/meal-schemas";
import { format } from "date-fns";
import { eventColorMap } from "@/lib/event-color-map";

interface Props {
  meal: MealForNutritionPlan;
}

const NutritionPlanMealListItem = ({ meal }: Props) => {
  const displayDate = format(meal.time, "MMMM do, yyyy");
  const displayTime = format(meal.time, "HH:mm");

  const rawKey = meal.calendarEvent?.colorKey;
  const key = (
    rawKey && rawKey in eventColorMap ? rawKey : "muted"
  ) as keyof typeof eventColorMap;

  const { bg, fg } = eventColorMap[key];
  return (
    <Card
      style={{
        backgroundColor: `var(${bg})`,
        color: `var(${fg})`,
      }}
    >
      <CardHeader>
        <CardTitle>{meal.type}</CardTitle>
        <CardDescription
          style={{
            color: `var(${fg})`,
          }}
        >
          {meal.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 items-start w-full">
        <div className="flex flex-row gap-2 text-xs font-semibold h-6">
          <div className="flex flex-row items-center gap-2 font-semibold">
            <CalendarIcon className="w-4 h-4" />
            <span>{displayDate}</span>
          </div>
          <Separator orientation={"vertical"} className={"h-full min-h-full"} />
          <div className="flex flex-row items-center gap-2 font-semibold">
            <ClockIcon className="w-4 h-4" />
            <span>{displayTime}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NutritionPlanMealListItem;
