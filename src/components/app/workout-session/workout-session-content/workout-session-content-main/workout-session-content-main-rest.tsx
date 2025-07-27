import { Card, CardContent } from "@/components/ui/card";
import { Coffee, Minus, Plus } from "lucide-react";
import { CircularTimer } from "@/components/ui/circular-timer";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import {
  CurrentExerciseData,
  WorkoutSessionSession,
} from "@/zod-schemas/workout-session-schemas";

interface Props {
  setIndex: number;
  currentExerciseData: CurrentExerciseData;
  restTimeRemaining: number;
  session: WorkoutSessionSession;
  totalSteps: number;
  adjustRestTime: (time: number) => void;
}

const WorkoutSessionContentMainRest = ({
  setIndex,
  currentExerciseData,
  restTimeRemaining,
  session,
  totalSteps,
  adjustRestTime,
}: Props) => {
  return (
    <motion.div
      key="rest"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-4 flex-1 h-full"
    >
      <Card className="border-chart-1/30 h-full bg-chart-1/5 backdrop-blur-sm">
        <CardContent className="p-6 text-center space-y-4">
          <div className="flex items-center justify-center gap-2 text-chart-1">
            <Coffee className="w-6 h-6" />
            <h3 className="text-lg font-semibold">Rest Time</h3>
          </div>

          <div className="text-sm text-muted-foreground mb-2">
            Set {setIndex + 1} completed! Rest before next set.
          </div>

          <CircularTimer
            duration={currentExerciseData.set.restTime || 60}
            elapsed={
              (currentExerciseData.set.restTime || 60) * 1000 -
              restTimeRemaining
            }
            isActive={true}
            size={140}
            className="mx-auto"
          />

          <p className="text-sm text-muted-foreground">
            {session.currentStep < totalSteps - 1
              ? "Prepare for next set"
              : "Almost done!"}
          </p>

          {/* Rest Time Controls */}
          <div className="flex items-center justify-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => adjustRestTime(-15)}
              disabled={restTimeRemaining <= 15000}
              className="border-chart-1/30 hover:bg-chart-1/10"
            >
              <Minus className="w-4 h-4" />
              15s
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => adjustRestTime(15)}
              className="border-chart-1/30 hover:bg-chart-1/10"
            >
              <Plus className="w-4 h-4" />
              15s
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default WorkoutSessionContentMainRest;
