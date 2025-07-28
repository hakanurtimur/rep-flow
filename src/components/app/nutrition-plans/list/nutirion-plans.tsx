"use client";

import { useState } from "react";
import PageBodyInnerContainer from "@/components/layout-related/page-body-inner-container";
import LoadingOverlay from "@/components/ui/loading-overlay";
import NutritionPlansHeader from "@/components/app/nutrition-plans/list/nutrition-plans-header";
import MealList from "@/components/app/nutrition-plans/list/nutrition-plan-meal-list";
import { useGetNutritionPlanByDate } from "@/hooks/nutrition-plan/use-get-nutrition-plan-by-date";
import { useSearchParams } from "next/navigation";

const today = new Date().toISOString().split("T")[0];

const NutritionPlans = () => {
  const [date, setDate] = useState(today);
  const query = useGetNutritionPlanByDate(date);
  const searchParams = useSearchParams();
  const actionParam = searchParams.get("action");

  const [viewVariant, setViewVariant] = useState<"meals" | "stats">("meals");

  const handleViewVariantChange = (variant: "meals" | "stats") => {
    setViewVariant(variant);
  };
  return (
    <PageBodyInnerContainer>
      <NutritionPlansHeader
        onViewVariantChange={handleViewVariantChange}
        viewVariant={viewVariant}
        date={date}
        onChangeDate={setDate}
        actionParam={actionParam}
      />
      {query.isLoading ? (
        <LoadingOverlay fullScreen={false} />
      ) : viewVariant === "meals" ? (
        <MealList nutritionPlan={query.data} />
      ) : (
        <div>Statistics</div>
      )}
    </PageBodyInnerContainer>
  );
};

export default NutritionPlans;
