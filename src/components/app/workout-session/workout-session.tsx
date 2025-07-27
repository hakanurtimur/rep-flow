"use client";

import { WorkoutSessionContent } from "@/components/app/workout-session/workout-session-content/workout-session-content";
import LoadingOverlay from "@/components/ui/loading-overlay";
import { useGetWorkoutSession } from "@/hooks/workout-session/use-get-workout-session";
import { useParams } from "next/navigation";

const WorkoutSession = () => {
  const { sessionId } = useParams();

  const query = useGetWorkoutSession(sessionId as string);

  if (query.isLoading || !query.data) {
    return <LoadingOverlay fullScreen={false} />;
  }
  return (
    <>
      <WorkoutSessionContent
        workout={query.data.workout}
        initialSession={query.data.session}
      />
    </>
  );
};

export default WorkoutSession;
