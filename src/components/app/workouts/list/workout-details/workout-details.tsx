"use client";

import { useParams } from "next/navigation";
import PageBodyInnerContainer from "@/components/layout-related/page-body-inner-container";
import LoadingOverlay from "@/components/ui/loading-overlay";
import { useState } from "react";
import { useGetWorkout } from "@/hooks/workout/use-get-workout";
import WorkoutDetailsHeader from "@/components/app/workouts/list/workout-details/workout-details-header";
import WorkoutDetailsContent from "@/components/app/workouts/list/workout-details/workout-details-content/workout-details-content";

const WorkoutDetails = () => {
  const { workoutId } = useParams();
  const [viewVariant, setViewVariant] = useState<"preview" | "edit">("preview");
  // const searchParams = useSearchParams();
  //
  // const byParam = searchParams.get("by");

  const query = useGetWorkout(workoutId as string);
  console.log(query);

  if (query.isLoading || !query.data) {
    return <LoadingOverlay fullScreen={false} />;
  }

  const handleViewVariantChange = (variant: "edit" | "preview") => {
    setViewVariant(variant);
  };

  return (
    <PageBodyInnerContainer>
      <WorkoutDetailsHeader
        workout={query.data}
        viewVariant={viewVariant}
        onViewVariantChange={handleViewVariantChange}
        byParam={null}
      />
      <WorkoutDetailsContent
        workout={query.data}
        viewVariant={viewVariant}
        onViewVariantChange={handleViewVariantChange}
      />
    </PageBodyInnerContainer>
  );
};

export default WorkoutDetails;
