"use client";
import * as React from "react";
import { MealForNutritionPlan } from "@/zod-schemas/meal-schemas";
import { Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export function getMacroCalorieDistribution(meal: MealForNutritionPlan) {
  const total = {
    carbs: 0,
    protein: 0,
    fat: 0,
  };

  for (const mf of meal.mealFood) {
    const amount = mf.amount ?? 0;
    total.carbs += ((mf.food?.carbs ?? 0) / 100) * amount;
    total.protein += ((mf.food?.protein ?? 0) / 100) * amount;
    total.fat += ((mf.food?.fat ?? 0) / 100) * amount;
  }

  const totalCals = total.carbs * 4 + total.protein * 4 + total.fat * 9 || 1; // zero division guard

  return [
    {
      name: "Carbs",
      kcal: total.carbs * 4,
      percent: (total.carbs * 4 * 100) / totalCals,
      fill: "var(--chart-1)",
    },
    {
      name: "Protein",
      kcal: total.protein * 4,
      percent: (total.protein * 4 * 100) / totalCals,
      fill: "var(--chart-2)",
    },
    {
      name: "Fat",
      kcal: total.fat * 9,
      percent: (total.fat * 9 * 100) / totalCals,
      fill: "var(--chart-3)",
    },
  ];
}

interface Props {
  meal: MealForNutritionPlan;
}

const NutritionPlanMealListItemChart = ({ meal }: Props) => {
  const chartData = getMacroCalorieDistribution(meal);

  const chartConfig = {
    Carbs: {
      label: "Carbs",
      color: "var(--chart-1)",
    },
    Protein: {
      label: "Protein",
      color: "var(--chart-2)",
    },
    Fat: {
      label: "Fat",
      color: "var(--chart-3)",
    },
  } satisfies ChartConfig;

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Macro Breakdown</CardTitle>
        <CardDescription>Calorie-based macro distribution (%)</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={chartConfig} className="mx-auto">
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="percent"
              nameKey="name"
              outerRadius="100%"
              label={({ percent }) => `${percent.toFixed(0)}%`}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="text-muted-foreground">
          Total: {chartData.reduce((acc, c) => acc + c.kcal, 0).toFixed(0)} kcal
        </div>
      </CardFooter>
    </Card>
  );
};

export default NutritionPlanMealListItemChart;
