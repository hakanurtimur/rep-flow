import ExpandableButton from "@/components/ui/expandable-button";
import React from "react";
import { EditIcon, EyeIcon } from "lucide-react";
import { PageBodyInnerHeader } from "@/components/layout-related/page-body-inner-header";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

interface Props {
  onViewVariantChange: (variant: "preview" | "edit") => void;
  viewVariant: "preview" | "edit";
}

const viewVariants = [
  { mode: "preview", label: "Preview", icon: EyeIcon },
  { mode: "edit", label: "Edit", icon: EditIcon },
];

const MealDetailsHeader = ({ onViewVariantChange, viewVariant }: Props) => {
  return (
    <PageBodyInnerHeader title="Meal Details">
      <div className="flex shadow-xs border rounded-md items-center justify-end">
        {viewVariants.map(({ mode, label, icon: Icon }) => (
          <ExpandableButton
            size="icon"
            variant="ghost"
            className="bg-transparent shadow-none cursor-pointer"
            onClick={() => onViewVariantChange(mode as "preview" | "edit")}
            expanded={viewVariant === mode}
            expandedText={label}
            key={mode}
          >
            <Icon className="w-4 h-4" />
          </ExpandableButton>
        ))}
      </div>
      <Link href={"/nutrition-plans/list"}>
        <Button>
          <ArrowLeftIcon />
          Back To Nutrition Plans
        </Button>
      </Link>
    </PageBodyInnerHeader>
  );
};

export default MealDetailsHeader;
