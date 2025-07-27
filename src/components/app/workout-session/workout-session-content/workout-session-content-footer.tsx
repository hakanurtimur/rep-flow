import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Pause, Play, SkipForward } from "lucide-react";
import { WorkoutSessionSession } from "@/zod-schemas/workout-session-schemas";

interface Props {
  completeWorkout: () => void;
  pauseSession: () => void;
  session: WorkoutSessionSession;
  isResting: boolean;
  isSetActive: boolean;
  finishRest: () => void;
  skipRest: () => void;
  startSet: () => void;
  completeSet: () => void;
  nextStep: () => void;
  restartSession: () => void;
}

const WorkoutSessionContentFooter = ({
  completeWorkout,
  pauseSession,
  session,
  isResting,
  isSetActive,
  finishRest,
  skipRest,
  startSet,
  completeSet,
  nextStep,
  restartSession,
}: Props) => {
  return (
    <Card>
      <CardContent>
        <div className="flex gap-3">
          <Button variant="destructive" onClick={completeWorkout}>
            End Workout
          </Button>
          <Button variant="outline" onClick={restartSession}>
            Restart Session
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={pauseSession}
            className="flex-1 bg-transparent border-border hover:bg-muted/50"
          >
            {session.isPaused ? (
              <Play className="w-5 h-5 mr-2" />
            ) : (
              <Pause className="w-5 h-5 mr-2" />
            )}
            {session.isPaused ? "Resume" : "Pause"}
          </Button>

          {isResting ? (
            <>
              <Button
                size="lg"
                onClick={finishRest}
                variant={"tertiary"}
                className="flex-1"
              >
                <CheckCircle className="w-5 h-5 mr-2" />
                Next Set
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={skipRest}
                className="bg-chart-1 hover:bg-chart-1/90 text-chart-1-foreground border-chart-1"
              >
                <SkipForward className="w-5 h-5" />
              </Button>
            </>
          ) : !isSetActive ? (
            <Button
              size="lg"
              onClick={startSet}
              className="flex-1 bg-primary hover:bg-primary/90"
            >
              <Play className="w-5 h-5 mr-2" />
              Start Set
            </Button>
          ) : (
            <Button
              size="lg"
              onClick={completeSet}
              variant={"tertiary"}
              className="flex-1"
            >
              <CheckCircle className="w-5 h-5 mr-2" />
              Complete Set
            </Button>
          )}

          {!isResting && (
            <Button
              variant="outline"
              size="lg"
              onClick={nextStep}
              className="border-border hover:bg-muted/50 bg-transparent"
            >
              <SkipForward className="w-5 h-5" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default WorkoutSessionContentFooter;
