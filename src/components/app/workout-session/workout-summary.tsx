"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { Calendar, CheckCircle, Clock, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  WorkoutSessionSession,
  WorkoutSessionWorkout,
} from "@/zod-schemas/workout-session-schemas";
import { useUpdateScheduledWorkoutStatus } from "@/hooks/scheduled-workout/use-update-scheduled-workout-status";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const WorkoutSummary = memo<{
  workout: WorkoutSessionWorkout;
  session: WorkoutSessionSession;
  totalSteps: number;
}>(function WorkoutSummary({ workout, session, totalSteps }) {
  const router = useRouter();
  const updateScheduledWorkoutStatusMutation = useUpdateScheduledWorkoutStatus({
    onSuccess: () => {
      toast("Workout Completed!");
      router.push("/dashboard");
    },
  });
  const formatDuration = (ms: number): string => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="min-h-screen bg-gradient-to-br from-tertiary/10 to-primary/10 flex items-center justify-center p-4"
    >
      <Card className="w-full max-w-md border-tertiary/20 bg-card/95 backdrop-blur-sm">
        <CardContent className="p-8 text-center space-y-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
          >
            <div className="w-16 h-16 bg-tertiary rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-tertiary-foreground" />
            </div>
          </motion.div>

          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-foreground">
              Workout Complete!
            </h2>
            <p className="text-muted-foreground">{workout.name}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="space-y-2 p-4 rounded-lg bg-muted/50">
              <Clock className="w-5 h-5 mx-auto text-info" />
              <p className="text-sm text-muted-foreground">Duration</p>
              <p className="font-semibold text-foreground">
                {formatDuration(session.durationElapsed)}
              </p>
            </div>
            <div className="space-y-2 p-4 rounded-lg bg-muted/50">
              <Target className="w-5 h-5 mx-auto text-primary" />
              <p className="text-sm text-muted-foreground">Steps</p>
              <p className="font-semibold text-foreground">
                {totalSteps}/{totalSteps}
              </p>
            </div>
          </div>

          {session.scheduledWorkoutId && (
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground p-3 rounded-lg bg-info/10">
              <Calendar className="w-4 h-4" />
              <span>Scheduled workout completed</span>
            </div>
          )}

          <Button
            onClick={() =>
              updateScheduledWorkoutStatusMutation.mutate({
                id: session.scheduledWorkoutId ?? "",
                input: {
                  completed: true,
                },
              })
            }
            variant={"tertiary"}
            className="w-full"
            size="lg"
            loading={updateScheduledWorkoutStatusMutation.isPending}
          >
            Done
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
});

export default WorkoutSummary;
