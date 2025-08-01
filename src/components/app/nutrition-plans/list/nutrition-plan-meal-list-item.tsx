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
import { Badge } from "@/components/ui/badge";
import * as React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import NutritionPlanMealListItemAmounts from "@/components/app/nutrition-plans/list/nutrition-plan-meal-list-item-amounts";
import NutritionPlanMealListItemChart from "@/components/app/nutrition-plans/list/nutrition-plan-meal-list-item-chart";

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
    <div className="flex flex-col gap-4">
      <div className="flex flex-row items-center">
        <Badge
          style={{
            color: `var(${fg}`,
            backgroundColor: `var(${bg}`,
          }}
          className="flex flex-row items-center gap-1 text-sm"
        >
          <ClockIcon className="w-4 h-4" />
          <span>{displayTime}</span>
        </Badge>
        <Separator
          className="flex-1"
          style={{
            backgroundColor: `var(${bg}`,
          }}
        />
      </div>
      <Card
        style={{
          backgroundColor: `var(${bg})`,
          color: `var(${fg})`,
        }}
      >
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>{meal.type}</CardTitle>
            <Link href={`/nutrition-plans/list/${meal.id}`}>
              <Button>Meal Details</Button>
            </Link>
          </div>
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
            <Separator
              orientation={"vertical"}
              className={"h-full min-h-full"}
            />
            <div className="flex flex-row items-center gap-2 font-semibold">
              <ClockIcon className="w-4 h-4" />
              <span>{displayTime}</span>
            </div>
          </div>
          <Card className="w-full">
            <CardContent className="w-full">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <div className="flex justify-between items-center">
                    <AccordionTrigger>Expand Food List</AccordionTrigger>
                  </div>
                  <AccordionContent className="flex flex-col gap-4 text-balance">
                    <NutritionPlanMealListItemAmounts meal={meal} />
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <div className="flex justify-between items-center">
                    <AccordionTrigger>Calorie Chart</AccordionTrigger>
                  </div>
                  <AccordionContent className="flex flex-col gap-4 text-balance">
                    <NutritionPlanMealListItemChart meal={meal} />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};

export default NutritionPlanMealListItem;
