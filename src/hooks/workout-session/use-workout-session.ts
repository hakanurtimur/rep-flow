"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  CurrentExerciseData,
  WorkoutSessionSession,
  WorkoutSessionState,
  WorkoutSessionWorkout,
} from "@/zod-schemas/workout-session-schemas";
import { usePatchWorkoutSession } from "@/hooks/workout-session/use-patch-workout-session";

interface UseWorkoutSessionReturn extends WorkoutSessionState {
  pauseSession: () => void;
  nextStep: () => void;
  startSet: () => void;
  completeSet: () => void;
  finishRest: () => void;
  skipRest: () => void;
  adjustRestTime: (seconds: number) => void;
  completeWorkout: () => void;
  restartSession: () => void;
}

export function useWorkoutSession(
  workout: WorkoutSessionWorkout,
  initialSession: WorkoutSessionSession,
): UseWorkoutSessionReturn {
  const patchMutation = usePatchWorkoutSession();
  const [session, setSession] = useState<WorkoutSessionSession>(
    () => initialSession,
  );

  const [currentTimer, setCurrentTimer] = useState(0);
  const [isSetActive, setIsSetActive] = useState(false);
  const [isResting, setIsResting] = useState(false);
  const [restTimeRemaining, setRestTimeRemaining] = useState(0);

  // Memoized calculations
  const totalSteps = useMemo(
    () =>
      workout.exercises.reduce(
        (total, exercise) => total + exercise.sets.length,
        0,
      ),
    [workout.exercises],
  );

  const currentExerciseData = useMemo((): CurrentExerciseData | null => {
    let stepCount = 0;
    for (const exercise of workout.exercises) {
      if (stepCount + exercise.sets.length > session.currentStep) {
        const setIndex = session.currentStep - stepCount;
        return {
          exercise,
          set: exercise.sets[setIndex],
          setIndex,
          exerciseIndex: exercise.order,
        };
      }
      stepCount += exercise.sets.length;
    }
    return null;
  }, [workout.exercises, session.currentStep]);

  // Session actions
  const pauseSession = useCallback(() => {
    setSession((prev) => {
      const updated = { ...prev, isPaused: !prev.isPaused };
      patchMutation.mutate({
        id: updated.id,
        isPaused: updated.isPaused,
      });

      return updated;
    });
  }, [patchMutation]);

  const nextStep = useCallback(() => {
    if (session.currentStep < totalSteps - 1) {
      const newStep = session.currentStep + 1;
      const newDuration = session.durationElapsed + currentTimer;

      setSession((prev) => {
        patchMutation.mutate({
          id: prev.id,
          currentStep: newStep,
          durationElapsed: newDuration,
        });

        return {
          ...prev,
          currentStep: newStep,
          durationElapsed: newDuration,
        };
      });

      setCurrentTimer(0);
      setIsSetActive(false);
      setIsResting(false);
      setRestTimeRemaining(0);
    } else {
      const endedAt = new Date().toISOString();

      setSession((prev) => {
        patchMutation.mutate({
          id: prev.id,
          isActive: false,
          endedAt,
        });

        return {
          ...prev,
          isActive: false,
          endedAt,
        };
      });
    }
  }, [
    session.currentStep,
    session.durationElapsed,
    totalSteps,
    currentTimer,
    patchMutation,
  ]);

  const startSet = useCallback(() => {
    setIsSetActive(true);
    setCurrentTimer(0);
    setIsResting(false);
    setRestTimeRemaining(0);
  }, []);

  const completeSet = useCallback(() => {
    setIsSetActive(false);
    setCurrentTimer(0);

    if (
      currentExerciseData?.set.restTime &&
      currentExerciseData.set.restTime > 0
    ) {
      const isLastStep = session.currentStep >= totalSteps - 1;
      if (!isLastStep) {
        setIsResting(true);
        setRestTimeRemaining(currentExerciseData.set.restTime * 1000);
        return;
      }
    }

    setSession((prev) => {
      const isLastStep = prev.currentStep >= totalSteps - 1;

      const updated = isLastStep
        ? {
            ...prev,
            isActive: false,
            endedAt: new Date().toISOString(),
          }
        : {
            ...prev,
            currentStep: prev.currentStep + 1,
          };

      patchMutation.mutate({
        id: updated.id,
        currentStep: updated.currentStep,
        isActive: updated.isActive,
        endedAt: updated.endedAt ?? undefined,
      });

      return updated;
    });
  }, [currentExerciseData, session.currentStep, totalSteps, patchMutation]);

  const finishRest = useCallback(() => {
    setIsResting(false);
    setRestTimeRemaining(0);

    setSession((prev) => {
      const isLastStep = prev.currentStep >= totalSteps - 1;

      const updated = isLastStep
        ? {
            ...prev,
            isActive: false,
            endedAt: new Date().toISOString(),
          }
        : {
            ...prev,
            currentStep: prev.currentStep + 1,
          };

      patchMutation.mutate({
        id: updated.id,
        currentStep: updated.currentStep,
        isActive: updated.isActive,
        endedAt: updated.endedAt ?? undefined,
      });

      return updated;
    });
  }, [totalSteps, patchMutation]);

  const skipRest = useCallback(() => {
    setIsResting(false);
    setRestTimeRemaining(0);
  }, []);

  const adjustRestTime = useCallback((additionalSeconds: number) => {
    setRestTimeRemaining((prev) =>
      Math.max(0, prev + additionalSeconds * 1000),
    );
  }, []);

  const completeWorkout = useCallback(() => {
    const endedAt = new Date().toISOString();

    setSession((prev) => {
      const updated = {
        ...prev,
        isActive: false,
        endedAt,
      };

      patchMutation.mutate({
        id: updated.id,
        isActive: updated.isActive,
        endedAt: updated.endedAt,
      });

      return updated;
    });
  }, [patchMutation]);

  const restartSession = useCallback(() => {
    const updatedSession = {
      ...session,
      currentStep: 0,
      durationElapsed: 0,
      isPaused: false,
      isActive: true,
      startedAt: new Date().toISOString(),
      endedAt: null,
    };

    patchMutation.mutate({
      id: session.id,
      currentStep: 0,
      durationElapsed: 0,
      isPaused: false,
      isActive: true,
      endedAt: undefined,
    });

    setSession(updatedSession);
  }, [session, patchMutation]);

  // Timer effects
  useEffect(() => {
    if (!session.isActive || session.isPaused) return;

    const interval = setInterval(() => {
      setSession((prev) => ({
        ...prev,
        durationElapsed: prev.durationElapsed + 1000,
      }));

      if (isSetActive && currentExerciseData?.set) {
        setCurrentTimer((prev) => {
          const duration = currentExerciseData.set.duration || 30;
          if (prev >= duration * 1000) {
            setIsSetActive(false);
            setCurrentTimer(0);
            return 0;
          }
          return prev + 1000;
        });
      }

      if (isResting) {
        setRestTimeRemaining((prev) => {
          if (prev <= 1000) {
            setIsResting(false);
            return 0;
          }
          return prev - 1000;
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [
    session.isActive,
    session.isPaused,
    isSetActive,
    isResting,
    currentExerciseData,
  ]);

  return {
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
  };
}
