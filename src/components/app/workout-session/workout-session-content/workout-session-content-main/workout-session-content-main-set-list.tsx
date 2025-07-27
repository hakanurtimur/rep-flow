import { Card, CardContent } from "@/components/ui/card";
import { WorkoutSessionWorkoutExercise } from "@/zod-schemas/workout-session-schemas";

interface Props {
  exercise: WorkoutSessionWorkoutExercise;
  setIndex: number;
}
const WorkoutSessionContentMainSetList = ({ exercise, setIndex }: Props) => {
  return (
    <Card className="border-border backdrop-blur-sm h-full">
      <CardContent className="p-4">
        <p className="text-sm font-medium mb-3 text-foreground">All Sets</p>
        <div className="flex flex-col gap-2 min-w-[15rem]">
          {exercise.sets.map((s, idx) => (
            <div
              key={idx}
              className={`flex-1 p-2 rounded-lg border text-center text-xs transition-all duration-200 ${
                idx === setIndex
                  ? "bg-primary text-primary-foreground border-primary shadow-sm"
                  : idx < setIndex
                    ? "bg-success/10 border-success/20 text-success"
                    : "border-border bg-muted/30 text-muted-foreground"
              }`}
            >
              <div className="font-medium">{s.reps} reps</div>
              {s.weight && <div className="opacity-75">{s.weight}kg</div>}
              {s.restTime && (
                <div className="text-chart-1 text-xs">{s.restTime}s rest</div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default WorkoutSessionContentMainSetList;
