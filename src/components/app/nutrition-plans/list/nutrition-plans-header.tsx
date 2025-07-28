import { Button } from "@/components/ui/button";
import ExpandableButton from "@/components/ui/expandable-button";
import React, { useState } from "react";
import { AppleIcon, ChartSplineIcon } from "lucide-react";
import { PageBodyInnerHeader } from "@/components/layout-related/page-body-inner-header";
import { CalendarPopover } from "@/components/ui/calendar-popover";

import { format, parseISO } from "date-fns";
import AddMealDialog from "@/components/app/nutrition-plans/list/add-meal-dialog/add-meal-dialog";

interface Props {
  onViewVariantChange: (variant: "meals" | "stats") => void;
  viewVariant: "meals" | "stats";
  date: string;
  onChangeDate: (date: string) => void;
  actionParam: string | null;
}

const viewVariants = [
  { mode: "meals", label: "Meals", icon: AppleIcon },
  { mode: "stats", label: "Statistics", icon: ChartSplineIcon },
];

const NutritionPlansHeader = ({
  onViewVariantChange,
  viewVariant,
  date,
  onChangeDate,
  actionParam,
}: Props) => {
  const obj = parseISO(date);
  const [open, setOpen] = useState(actionParam === "add-meal");
  return (
    <PageBodyInnerHeader title="Nutrition Plans">
      <CalendarPopover
        setDate={(val) => {
          if (val) {
            onChangeDate(format(val, "yyyy-MM-dd"));
          }
        }}
        date={new Date(date)}
        dateStr={format(obj, "MMM do, yyyy")}
      />
      <div className="flex shadow-xs border rounded-md items-center justify-end">
        {viewVariants.map(({ mode, label, icon: Icon }) => (
          <ExpandableButton
            size="icon"
            variant="ghost"
            className="bg-transparent shadow-none cursor-pointer"
            onClick={() => onViewVariantChange(mode as "meals" | "stats")}
            expanded={viewVariant === mode}
            expandedText={label}
            key={mode}
          >
            <Icon className="w-4 h-4" />
          </ExpandableButton>
        ))}
      </div>
      <AddMealDialog date={date} open={open} onOpenChange={setOpen}>
        <Button variant="dark" className="w-fit">
          Add Meal
        </Button>
      </AddMealDialog>
    </PageBodyInnerHeader>
  );
};

export default NutritionPlansHeader;
