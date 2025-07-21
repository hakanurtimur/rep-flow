import { FlameIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  value: number; // 0-10 arası değer
  maxFlames?: number; // default: 5 alev gösterilir
  className?: string;
};

const DifficultyRating = ({ value, maxFlames = 5, className }: Props) => {
  const normalized = Math.min(Math.max(value, 0), 10); // clamp 0–10
  const rating = (normalized / 10) * maxFlames; // 🔥 sayısına çevir

  const fullCount = Math.floor(rating);
  const hasHalf = rating - fullCount >= 0.5;
  const emptyCount = maxFlames - fullCount - (hasHalf ? 1 : 0);

  return (
    <div className={cn("flex items-center gap-0.5", className)}>
      {Array.from({ length: fullCount }).map((_, i) => (
        <FlameIcon
          key={`full-${i}`}
          className="w-4 h-4 text-destructive fill-destructive"
        />
      ))}

      {hasHalf && (
        <FlameIcon className="w-4 h-4 text-destructive fill-destructive  opacity-50" />
      )}

      {Array.from({ length: emptyCount }).map((_, i) => (
        <FlameIcon
          key={`empty-${i}`}
          className="w-4 h-4 text-muted stroke-muted-foreground opacity-20"
        />
      ))}
    </div>
  );
};

export default DifficultyRating;
