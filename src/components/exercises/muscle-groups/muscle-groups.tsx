"use client";

import { useListMuscleGroups } from "@/hooks/muscle-group/use-list-muscle-groups";
import MuscleGroupList from "@/components/exercises/muscle-groups/muscle-group-list";
import LoadingOverlay from "@/components/ui/loading-overlay";

const MuscleGroups = () => {
  const query = useListMuscleGroups();

  if (query.isLoading || !query.data) {
    return <LoadingOverlay fullScreen={false} />;
  }

  return (
    <>
      <MuscleGroupList muscleGroups={query.data} />
    </>
  );
};

export default MuscleGroups;
