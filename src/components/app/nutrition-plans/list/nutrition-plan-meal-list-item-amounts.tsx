import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import * as React from "react";
import { MealForNutritionPlan } from "@/zod-schemas/meal-schemas";

interface Props {
  meal: MealForNutritionPlan;
}

const NutritionPlanMealListItemAmounts = ({ meal }: Props) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Name</TableHead>
          <TableHead>Amount (g)</TableHead>
          <TableHead>Protein (g)</TableHead>
          <TableHead>Fat (g)</TableHead>
          <TableHead>Carbs (g)</TableHead>
          <TableHead>Calories (kcal)</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {meal.mealFood.map((mf) => {
          const macros = {
            protein: ((mf.food?.protein ?? 0) / 100) * mf.amount,
            carbs: ((mf.food?.carbs ?? 0) / 100) * mf.amount,
            fat: ((mf.food?.fat ?? 0) / 100) * mf.amount,
            calories: ((mf.food?.calories ?? 0) / 100) * mf.amount,
          };

          return (
            <TableRow key={mf.id}>
              <TableCell className="font-medium">{mf.food.name}</TableCell>
              <TableCell>{mf.amount.toFixed(1)}</TableCell>
              <TableCell>{macros.protein.toFixed(1)}</TableCell>
              <TableCell>{macros.fat.toFixed(1)}</TableCell>
              <TableCell>{macros.carbs.toFixed(1)}</TableCell>
              <TableCell>{macros.calories.toFixed(1)}</TableCell>
            </TableRow>
          );
        })}
        <TableRow className="font-semibold border-t border-muted">
          <TableCell className="font-semibold">Total</TableCell>
          <TableCell>
            {meal.mealFood.reduce((sum, mf) => sum + mf.amount, 0).toFixed(1)}
          </TableCell>
          <TableCell>
            {meal.mealFood
              .reduce(
                (sum, mf) => sum + ((mf.food?.protein ?? 0) / 100) * mf.amount,
                0,
              )
              .toFixed(1)}
          </TableCell>
          <TableCell>
            {meal.mealFood
              .reduce(
                (sum, mf) => sum + ((mf.food?.fat ?? 0) / 100) * mf.amount,
                0,
              )
              .toFixed(1)}
          </TableCell>
          <TableCell>
            {meal.mealFood
              .reduce(
                (sum, mf) => sum + ((mf.food?.carbs ?? 0) / 100) * mf.amount,
                0,
              )
              .toFixed(1)}
          </TableCell>
          <TableCell>
            {meal.mealFood
              .reduce(
                (sum, mf) => sum + ((mf.food?.calories ?? 0) / 100) * mf.amount,
                0,
              )
              .toFixed(1)}
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default NutritionPlanMealListItemAmounts;
