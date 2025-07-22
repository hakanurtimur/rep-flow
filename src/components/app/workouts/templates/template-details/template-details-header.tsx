import { PageBodyInnerHeader } from "@/components/layout-related/page-body-inner-header";
import React, { useState } from "react";
import { ExtendedWorkoutTemplate } from "@/zod-schemas/workout-template-schemas";
import { Edit2Icon, EyeIcon } from "lucide-react";
import ExpandableButton from "@/components/ui/expandable-button";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import DeleteAlertDialog from "@/components/delete-alert-dialog";
import { useDeleteWorkoutTemplate } from "@/hooks/workout-template/use-delete-workoute-template";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface Props {
  template: ExtendedWorkoutTemplate;
  viewVariant: "edit" | "preview";
  onViewVariantChange: (variant: "edit" | "preview") => void;
  byParam: string | null;
}

const TemplateDetailsHeader = ({
  template,
  viewVariant,
  onViewVariantChange,
  byParam,
}: Props) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const router = useRouter();
  const mutation = useDeleteWorkoutTemplate({
    onSuccess: () => {
      toast("Workout deleted succesfully");
      router.push("/workouts/templates");
    },
  });
  const viewVariants = template.isSystem
    ? [{ mode: "preview", label: "Preview", icon: EyeIcon }]
    : [
        { mode: "preview", label: "Preview", icon: EyeIcon },
        { mode: "edit", label: "Edit", icon: Edit2Icon },
      ];

  return (
    <PageBodyInnerHeader title={template.name}>
      {!template.isSystem && viewVariant === "edit" && (
        <DeleteAlertDialog
          onDelete={() => mutation.mutate(template.id)}
          title={"Delete Workout Template"}
          description={
            "Are you sure you want to delete this workout template? This action cannot be undone."
          }
          disabled={mutation.isPending}
          loading={mutation.isPending}
          isOpen={isDeleteDialogOpen}
          onOpenChange={setIsDeleteDialogOpen}
        >
          <Button variant="destructive">Delete Workout Template</Button>
        </DeleteAlertDialog>
      )}
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
      <Link href={byParam ?? "/workouts/templates"}>
        <Button>
          <ArrowLeftIcon /> {byParam ? "Back" : "Back To Templates"}
        </Button>
      </Link>
    </PageBodyInnerHeader>
  );
};

export default TemplateDetailsHeader;
