"use client";

import { useListMuscleGroups } from "@/hooks/muscle-group/use-list-muscle-groups";
import MuscleGroupList from "@/components/app/exercises/muscle-groups/muscle-group-list";
import LoadingOverlay from "@/components/ui/loading-overlay";
import MuscleGroupsHeader from "@/components/app/exercises/muscle-groups/muscle-groups-header";
import { useState } from "react";
import PageBodyInnerContainer from "@/components/layout-related/page-body-inner-container";

const MuscleGroups = () => {
  const query = useListMuscleGroups();
  const [viewVariant, setViewVariant] = useState<"card" | "list">("card");

  if (query.isLoading || !query.data) {
    return <LoadingOverlay fullScreen={false} />;
  }

  const handleViewVariantChange = (variant: "card" | "list") => {
    setViewVariant(variant);
  };

  return (
    <PageBodyInnerContainer>
      <MuscleGroupsHeader
        onViewVariantChange={handleViewVariantChange}
        viewVariant={viewVariant}
      />
      <MuscleGroupList viewVariant={viewVariant} muscleGroups={query.data} />
    </PageBodyInnerContainer>
  );
};

export default MuscleGroups;
