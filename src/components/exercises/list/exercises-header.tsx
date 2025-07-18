import { Button } from "@/components/ui/button";
import ExpandableButton from "@/components/ui/expandable-button";
import React from "react";
import { AlignJustifyIcon, LayoutGridIcon } from "lucide-react";
import { PageBodyInnerHeader } from "@/components/layout-related/page-body-inner-header";
import CreateExerciseDialog from "@/components/exercises/list/create-exercise-dialog/create-exercise-dialog";

interface Props {
  onViewVariantChange: (variant: "card" | "list") => void;
  viewVariant: "card" | "list";
}

const viewVariants = [
  { mode: "card", label: "Card View", icon: LayoutGridIcon },
  { mode: "list", label: "List View", icon: AlignJustifyIcon },
];
const ExercisesHeader = ({ onViewVariantChange, viewVariant }: Props) => {
  return (
    <PageBodyInnerHeader title="Exercises">
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
      <CreateExerciseDialog>
        <Button variant="dark" className="w-fit">
          Create Exercise
        </Button>
      </CreateExerciseDialog>
    </PageBodyInnerHeader>
  );
};

export default ExercisesHeader;
