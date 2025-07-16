"use client";

import { useListMuscleGroups } from "@/hooks/muscle-group/use-list-muscle-groups";
import MuscleGroupList from "@/components/exercises/muscle-groups/muscle-group-list";
import LoadingOverlay from "@/components/ui/loading-overlay";
import MuscleGroupsHeader from "@/components/exercises/muscle-groups/muscle-groups-header";

const MuscleGroups = () => {
  const query = useListMuscleGroups();

  if (query.isLoading || !query.data) {
    return <LoadingOverlay fullScreen={false} />;
  }

  return (
    <div className="flex w-full flex-col gap-4">
      <MuscleGroupsHeader />
      <MuscleGroupList muscleGroups={query.data} />
    </div>
  );
};

export default MuscleGroups;
