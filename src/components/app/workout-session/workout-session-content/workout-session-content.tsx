"use client";

import { useWorkoutSession } from "@/hooks/workout-session/use-workout-session";
import {
  WorkoutSessionSession,
  WorkoutSessionWorkout,
} from "@/zod-schemas/workout-session-schemas";
import WorkoutSummary from "@/components/app/workout-session/workout-summary";
import WorkoutSessionContentHeader from "@/components/app/workout-session/workout-session-content/workout-session-content-header";
import WorkoutSessionContentFooter from "@/components/app/workout-session/workout-session-content/workout-session-content-footer";
import WorkoutSessionContentMain from "@/components/app/workout-session/workout-session-content/workout-session-content-main/workout-session-content-main";

interface WorkoutSessionProps {
  workout: WorkoutSessionWorkout;
  initialSession: WorkoutSessionSession;
}

export function WorkoutSessionContent({
  workout,
  initialSession,
}: WorkoutSessionProps) {
  const {
    session,
    currentExerciseData,
    totalSteps,
    currentTimer,
    isSetActive,
    isResting,
    restTimeRemaining,
    pauseSession,
    nextStep,
    startSet,
    completeSet,
    finishRest,
    skipRest,
    adjustRestTime,
    completeWorkout,
    restartSession,
  } = useWorkoutSession(workout, initialSession);

  if (!session.isActive && session.endedAt) {
    return (
      <WorkoutSummary
        workout={workout}
        session={session}
        totalSteps={totalSteps}
      />
    );
  }

  if (!currentExerciseData) return null;

  const { exercise, set, setIndex, exerciseIndex } = currentExerciseData;
  const progress = ((session.currentStep + 1) / totalSteps) * 100;

  return (
    <div className="bg-background flex flex-col gap-4">
      <WorkoutSessionContentHeader
        session={session}
        totalSteps={totalSteps}
        workout={workout}
        progress={progress}
        exerciseIndex={exerciseIndex}
      />
      <WorkoutSessionContentMain
        isResting={isResting}
        setIndex={setIndex}
        currentExerciseData={currentExerciseData}
        restTimeRemaining={restTimeRemaining}
        session={session}
        totalSteps={totalSteps}
        adjustRestTime={adjustRestTime}
        set={set}
        currentTimer={currentTimer}
        isSetActive={isSetActive}
        exercise={exercise}
      />
      <WorkoutSessionContentFooter
        completeWorkout={completeWorkout}
        pauseSession={pauseSession}
        session={session}
        isResting={isResting}
        isSetActive={isSetActive}
        finishRest={finishRest}
        skipRest={skipRest}
        startSet={startSet}
        completeSet={completeSet}
        nextStep={nextStep}
        restartSession={restartSession}
      />
    </div>
  );
}
