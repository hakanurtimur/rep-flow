import { AnimatePresence } from "framer-motion";
import {
  CurrentExerciseData,
  WorkoutSessionSession,
  WorkoutSessionWorkoutExercise,
  WorkoutSessionWorkoutExerciseSet,
} from "@/zod-schemas/workout-session-schemas";
import WorkoutSessionContentMainRest from "@/components/app/workout-session/workout-session-content/workout-session-content-main/workout-session-content-main-rest";
import WorkoutSessionContentMainInSet from "@/components/app/workout-session/workout-session-content/workout-session-content-main/workout-session-content-main-in-set";
import WorkoutSessionContentMainSetList from "@/components/app/workout-session/workout-session-content/workout-session-content-main/workout-session-content-main-set-list";

interface Props {
  isResting: boolean;
  setIndex: number;
  currentExerciseData: CurrentExerciseData;
  restTimeRemaining: number;
  session: WorkoutSessionSession;
  totalSteps: number;
  adjustRestTime: (time: number) => void;
  set: WorkoutSessionWorkoutExerciseSet;
  currentTimer: number;
  isSetActive: boolean;
  exercise: WorkoutSessionWorkoutExercise;
}

const WorkoutSessionContentMain = ({
  isResting,
  setIndex,
  currentExerciseData,
  restTimeRemaining,
  session,
  totalSteps,
  adjustRestTime,
  set,
  currentTimer,
  isSetActive,
  exercise,
}: Props) => {
  return (
    <div className="flex-1 overflow-y-auto flex flex-col gap-4">
      <div className="w-full flex items-center gap-8 min-h-[26rem] h-[26rem]">
        <div className="flex-1 min-h-full flex items-center justify-center h-full">
          <AnimatePresence mode="wait">
            {isResting ? (
              <WorkoutSessionContentMainRest
                setIndex={setIndex}
                currentExerciseData={currentExerciseData}
                restTimeRemaining={restTimeRemaining}
                session={session}
                totalSteps={totalSteps}
                adjustRestTime={adjustRestTime}
              />
            ) : (
              <WorkoutSessionContentMainInSet
                setIndex={setIndex}
                set={set}
                currentTimer={currentTimer}
                isSetActive={isSetActive}
                exercise={exercise}
              />
            )}
          </AnimatePresence>
        </div>
        <WorkoutSessionContentMainSetList
          exercise={exercise}
          setIndex={setIndex}
        />
      </div>
    </div>
  );
};

export default WorkoutSessionContentMain;
