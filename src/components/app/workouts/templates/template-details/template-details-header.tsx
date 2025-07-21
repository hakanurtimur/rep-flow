import { PageBodyInnerHeader } from "@/components/layout-related/page-body-inner-header";
import React from "react";
import { ExtendedWorkoutTemplate } from "@/zod-schemas/workout-template-schemas";
import { Edit2Icon, EyeIcon } from "lucide-react";
import ExpandableButton from "@/components/ui/expandable-button";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

interface Props {
  template: ExtendedWorkoutTemplate;
  viewVariant: "edit" | "preview";
  onViewVariantChange: (variant: "edit" | "preview") => void;
}

const TemplateDetailsHeader = ({
  template,
  viewVariant,
  onViewVariantChange,
}: Props) => {
  const viewVariants = template.isSystem
    ? [{ mode: "preview", label: "Preview", icon: EyeIcon }]
    : [
        { mode: "preview", label: "Preview", icon: EyeIcon },
        { mode: "edit", label: "Edit", icon: Edit2Icon },
      ];
  return (
    <PageBodyInnerHeader title={template.name}>
      <div className="flex shadow-xs border rounded-md items-center justify-end">
        {viewVariants.map(({ mode, label, icon: Icon }) => (
          <ExpandableButton
            size="icon"
            variant="ghost"
            className="bg-transparent shadow-none cursor-pointer"
            onClick={() => onViewVariantChange(mode as "edit" | "preview")}
            expanded={viewVariant === mode}
            expandedText={label}
            key={mode}
          >
            <Icon className="w-4 h-4" />
          </ExpandableButton>
        ))}
      </div>
      <Link href={"/workouts/templates"}>
        <Button>
          <ArrowLeftIcon /> Back To Templates
        </Button>
      </Link>
    </PageBodyInnerHeader>
  );
};

export default TemplateDetailsHeader;
