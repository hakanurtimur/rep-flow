"use client";

import { useState } from "react";
import PageBodyInnerContainer from "@/components/layout-related/page-body-inner-container";
import LoadingOverlay from "@/components/ui/loading-overlay";
import MealDetailsHeader from "@/components/app/nutrition-plans/list/meal-details/meal-details-header";
import { useParams } from "next/navigation";
import { useGetMeal } from "@/hooks/meal/use-get-meal";
import MealDetailsPreview from "@/components/app/nutrition-plans/list/meal-details/meal-details-preview";
import MealDetailsEdit from "@/components/app/nutrition-plans/list/meal-details/meal-details-edit";

const MealDetails = () => {
  const { mealId } = useParams();
  const query = useGetMeal(mealId as string);

  const [viewVariant, setViewVariant] = useState<"preview" | "edit">("preview");

  const handleViewVariantChange = (variant: "preview" | "edit") => {
    setViewVariant(variant);
  };

  return (
    <PageBodyInnerContainer>
      <MealDetailsHeader
        onViewVariantChange={handleViewVariantChange}
        viewVariant={viewVariant}
      />
      {query.isLoading || !query.data ? (
        <LoadingOverlay fullScreen={false} />
      ) : viewVariant === "preview" ? (
        <MealDetailsPreview meal={query.data} />
      ) : (
        <MealDetailsEdit meal={query.data} />
      )}
    </PageBodyInnerContainer>
  );
};

export default MealDetails;
