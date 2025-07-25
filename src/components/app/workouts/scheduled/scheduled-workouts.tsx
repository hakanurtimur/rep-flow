"use client";

import { useState } from "react";
import PageBodyInnerContainer from "@/components/layout-related/page-body-inner-container";
import LoadingOverlay from "@/components/ui/loading-overlay";
import { useListScheduledWorkouts } from "@/hooks/scheduled-workout/use-list-scheduled-workouts";
import ScheduledWorkoutsHeader from "@/components/app/workouts/scheduled/scheduled-workouts-header";
import ScheduledWorkoutList from "@/components/app/workouts/scheduled/scheduled-workout-list";
import { useSearchParams } from "next/navigation";

const ScheduledWorkouts = () => {
  const query = useListScheduledWorkouts();
  const searchParams = useSearchParams();
  const actionParam = searchParams.get("action");

  const [viewVariant, setViewVariant] = useState<"card" | "list">("card");

  if (query.isLoading || !query.data) {
    return <LoadingOverlay fullScreen={false} />;
  }

  const handleViewVariantChange = (variant: "card" | "list") => {
    setViewVariant(variant);
  };
  return (
    <PageBodyInnerContainer>
      <ScheduledWorkoutsHeader
        onViewVariantChange={handleViewVariantChange}
        viewVariant={viewVariant}
        actionParam={actionParam}
      />
      <ScheduledWorkoutList
        viewVariant={viewVariant}
        scheduledWorkouts={query.data}
      />
    </PageBodyInnerContainer>
  );
};

export default ScheduledWorkouts;
