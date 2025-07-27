import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";
import DifficultyRating from "@/components/ui/difficulty-rating";
import { Progress } from "@/components/ui/progress";
import {
  WorkoutSessionSession,
  WorkoutSessionWorkout,
} from "@/zod-schemas/workout-session-schemas";

const formatDuration = (ms: number): string => {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

interface Props {
  session: WorkoutSessionSession;
  totalSteps: number;
  workout: WorkoutSessionWorkout;
  progress: number;
  exerciseIndex: number;
}

const WorkoutSessionContentHeader = ({
  session,
  totalSteps,
  workout,
  progress,
  exerciseIndex,
}: Props) => {
  return (
    <Card>
      <CardHeader className="flex items-center justify-between mb-4">
        <CardTitle>{workout.name}</CardTitle>
        <CardDescription>
          Step {session.currentStep + 1} of {totalSteps}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-8">
        <div className="w-full flex items-center gap-2">
          <Badge variant="secondary" className="gap-1 bg-secondary">
            <Clock className="w-3 h-3" />
            {formatDuration(session.durationElapsed)}
          </Badge>
          <DifficultyRating value={workout.difficulty} />
          <Progress value={progress} className="h-2 bg-muted" />
        </div>
        <div className="w-full flex flex-row items-center gap-2">
          {workout.exercises.map((e, idx) => (
            <div
              key={idx}
              className={`p-2 flex-1 rounded-lg border text-center text-xs transition-all duration-200 ${
                idx === exerciseIndex
                  ? "bg-primary text-primary-foreground border-primary shadow-sm"
                  : idx < exerciseIndex
                    ? "bg-success/10 border-success/20 text-success"
                    : "border-border bg-muted/30 text-muted-foreground"
              }`}
            >
              <div className="font-medium">{e.exercise.name}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default WorkoutSessionContentHeader;
