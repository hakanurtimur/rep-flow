import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MuscleGroup } from "@prisma/client";

interface Props {
  muscleGroup: MuscleGroup;
}

const MuscleGroupListItem = ({ muscleGroup }: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{muscleGroup.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          {muscleGroup.isSystem ? (
            <span className="text-sm text-muted-foreground">
              System Muscle Group
            </span>
          ) : (
            <span className="text-sm text-primary">Custom Muscle Group</span>
          )}
          <span className="text-xs text-muted-foreground">
            Created at: {new Date(muscleGroup.createdAt).toLocaleDateString()}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default MuscleGroupListItem;
