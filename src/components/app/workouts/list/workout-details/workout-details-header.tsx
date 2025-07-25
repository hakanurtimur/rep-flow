import { PageBodyInnerHeader } from "@/components/layout-related/page-body-inner-header";
import React, { useState } from "react";
import { EditIcon, EyeIcon } from "lucide-react";
import ExpandableButton from "@/components/ui/expandable-button";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import DeleteAlertDialog from "@/components/delete-alert-dialog";
import { ExtendedWorkout } from "@/zod-schemas/workout-schemas";
import { useDeleteWorkout } from "@/hooks/workout/use-delete-workout";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface Props {
  workout: ExtendedWorkout;
  viewVariant: "edit" | "preview";
  onViewVariantChange: (variant: "edit" | "preview") => void;
  fromParam: string | null;
}

const viewVariants = [
  { mode: "preview", label: "Preview", icon: EyeIcon },
  { mode: "edit", label: "Edit", icon: EditIcon },
];

const WorkoutDetailsHeader = ({
  workout,
  viewVariant,
  onViewVariantChange,
  fromParam,
}: Props) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const router = useRouter();

  const mutation = useDeleteWorkout({
    onSuccess: () => {
      toast("Workout deleted succesfully");
      router.push("/workouts/list");
    },
  });

  return (
    <PageBodyInnerHeader title={workout.name}>
      {viewVariant === "edit" && (
        <DeleteAlertDialog
          onDelete={() => mutation.mutate(workout.id)}
          title={"Delete Workout"}
          description={
            "Are you sure you want to delete this workout? This action cannot be undone."
          }
          disabled={mutation.isPending}
          loading={mutation.isPending}
          isOpen={isDeleteDialogOpen}
          onOpenChange={setIsDeleteDialogOpen}
          customError={mutation.error?.message}
        >
          <Button variant="destructive">Delete Workout</Button>
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
      <Link href={fromParam ?? "/workouts/list"}>
        <Button>
          <ArrowLeftIcon />{" "}
          {!fromParam
            ? "Back To Workouts"
            : fromParam.includes("dashboard")
              ? "Calendar"
              : "Scheduled Workouts"}
        </Button>
      </Link>
    </PageBodyInnerHeader>
  );
};

export default WorkoutDetailsHeader;
