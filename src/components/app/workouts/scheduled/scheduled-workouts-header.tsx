import { Button } from "@/components/ui/button";
import ExpandableButton from "@/components/ui/expandable-button";
import React from "react";
import { AlignJustifyIcon, LayoutGridIcon } from "lucide-react";
import { PageBodyInnerHeader } from "@/components/layout-related/page-body-inner-header";
import CreateScheduledWorkoutDialog from "@/components/app/workouts/scheduled/create-scheduled-workout-dialog/create-scheduled-workout-dialog";

interface Props {
  onViewVariantChange: (variant: "card" | "list") => void;
  viewVariant: "card" | "list";
}

const viewVariants = [
  { mode: "card", label: "Card View", icon: LayoutGridIcon },
  { mode: "list", label: "List View", icon: AlignJustifyIcon },
];
const ScheduledWorkoutsHeader = ({
  onViewVariantChange,
  viewVariant,
}: Props) => {
  return (
    <PageBodyInnerHeader title="Scheduled Workouts">
      <div className="flex shadow-xs border rounded-md items-center justify-end">
        {viewVariants.map(({ mode, label, icon: Icon }) => (
          <ExpandableButton
            size="icon"
            variant="ghost"
            className="bg-transparent shadow-none cursor-pointer"
            onClick={() => onViewVariantChange(mode as "card" | "list")}
            expanded={viewVariant === mode}
            expandedText={label}
            key={mode}
          >
            <Icon className="w-4 h-4" />
          </ExpandableButton>
        ))}
      </div>
      <CreateScheduledWorkoutDialog>
        <Button variant="dark" className="w-fit">
          Schedule a workout
        </Button>
      </CreateScheduledWorkoutDialog>
    </PageBodyInnerHeader>
  );
};

export default ScheduledWorkoutsHeader;
