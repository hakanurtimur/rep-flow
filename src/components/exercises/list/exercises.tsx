"use client";

import ExerciseList from "@/components/exercises/list/exercise-list";
import { useListExercises } from "@/hooks/exercise/use-list-exercises";
import LoadingOverlay from "@/components/ui/loading-overlay";
import PageBodyInnerContainer from "@/components/layout-related/page-body-inner-container";
import ExercisesHeader from "@/components/exercises/list/exercises-header";
import { useState } from "react";

const Exercises = () => {
  const query = useListExercises();
  const [viewVariant, setViewVariant] = useState<"card" | "list">("card");

  if (query.isLoading || !query.data) {
    return <LoadingOverlay fullScreen={false} />;
  }

  const handleViewVariantChange = (variant: "card" | "list") => {
    setViewVariant(variant);
  };

  return (
    <PageBodyInnerContainer>
      <ExercisesHeader
        onViewVariantChange={handleViewVariantChange}
        viewVariant={viewVariant}
      />
      <ExerciseList exercises={query.data} viewVariant={viewVariant} />
    </PageBodyInnerContainer>
  );
};

export default Exercises;
