"use client";

import { useState } from "react";
import PageBodyInnerContainer from "@/components/layout-related/page-body-inner-container";
import LoadingOverlay from "@/components/ui/loading-overlay";
import { useListWorkouts } from "@/hooks/workout/use-list-workouts";
import WorkoutsHeader from "@/components/app/workouts/list/workouts-header";
import WorkoutList from "@/components/app/workouts/list/workout-list";

const Workouts = () => {
  const query = useListWorkouts();

  const [viewVariant, setViewVariant] = useState<"card" | "list">("card");

  if (query.isLoading || !query.data) {
    return <LoadingOverlay fullScreen={false} />;
  }

  const handleViewVariantChange = (variant: "card" | "list") => {
    setViewVariant(variant);
  };
  return (
    <PageBodyInnerContainer>
      <WorkoutsHeader
        onViewVariantChange={handleViewVariantChange}
        viewVariant={viewVariant}
      />
      <WorkoutList viewVariant={viewVariant} workouts={query.data} />
    </PageBodyInnerContainer>
  );
};

export default Workouts;
