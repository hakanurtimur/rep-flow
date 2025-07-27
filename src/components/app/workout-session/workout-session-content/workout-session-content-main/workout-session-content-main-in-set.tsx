import { CircularTimer } from "@/components/ui/circular-timer";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import {
  WorkoutSessionWorkoutExercise,
  WorkoutSessionWorkoutExerciseSet,
} from "@/zod-schemas/workout-session-schemas";

interface Props {
  setIndex: number;
  set: WorkoutSessionWorkoutExerciseSet;
  currentTimer: number;
  isSetActive: boolean;
  exercise: WorkoutSessionWorkoutExercise;
}

const WorkoutSessionContentMainInSet = ({
  setIndex,
  set,
  currentTimer,
  isSetActive,
  exercise,
}: Props) => {
  return (
    <motion.div
      key="exercise"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-4 flex-1 h-full min-h-full"
    >
      <div className="flex justify-between items-center gap-8 h-full min-h-full ">
        <div className="flex items-center justify-center flex-1">
          <CircularTimer
            duration={set.duration || 30}
            elapsed={currentTimer}
            isActive={isSetActive}
            size={160}
          />
        </div>

        <Card className="flex-1 h-full border-border backdrop-blur-sm">
          <CardContent className="flex flex-col items-stretch justify-center h-full">
            <div className="text-center space-y-4 ">
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  Current Set
                </p>
                <p className="text-3xl font-bold text-foreground font-mono">
                  {setIndex + 1}/{exercise.sets.length}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 flex-1">
                <div className="text-center p-3 rounded-lg bg-primary/5 border border-primary/10">
                  <p className="text-sm text-muted-foreground">Reps</p>
                  <p className="text-xl font-semibold text-foreground">
                    {set.reps}
                  </p>
                </div>
                {set.weight && (
                  <div className="text-center p-3 rounded-lg bg-info/5 border border-info/10">
                    <p className="text-sm text-muted-foreground">Weight</p>
                    <p className="text-xl font-semibold text-foreground">
                      {set.weight}kg
                    </p>
                  </div>
                )}
              </div>

              {set.restTime && set.restTime > 0 && (
                <div className="text-center p-3 rounded-lg bg-chart-1/5 border border-chart-1/10">
                  <p className="text-sm text-muted-foreground">
                    Rest after this set
                  </p>
                  <p className="text-lg font-semibold text-chart-1">
                    {set.restTime}s
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
};

export default WorkoutSessionContentMainInSet;
