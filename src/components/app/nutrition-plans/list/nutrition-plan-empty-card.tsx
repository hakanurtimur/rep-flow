import { Card, CardHeader, CardTitle } from "@/components/ui/card";

const NutritionPlanEmptyCard = () => {
  return (
    <Card className="flex items-center justify-center">
      <CardHeader className="w-full">
        <CardTitle>There is no nutrition plan yet</CardTitle>
      </CardHeader>
    </Card>
  );
};

export default NutritionPlanEmptyCard;
