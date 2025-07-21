import { ExtendedWorkoutTemplate } from "@/zod-schemas/workout-template-schemas";
import MotionContainerY from "@/components/motioned-components/motion-container-y";
import TemplateDetailsContentPreview from "@/components/workouts/templates/template-details/template-details-content/template-details-content-preview";
import TemplateDetailsContentEdit from "@/components/workouts/templates/template-details/template-details-content/template-details-content-edit/template-details-content-edit";

interface Props {
  template: ExtendedWorkoutTemplate;
  viewVariant: "edit" | "preview";
  onViewVariantChange: (variant: "edit" | "preview") => void;
}

const TemplateDetailsContent = ({
  template,
  viewVariant,
  onViewVariantChange,
}: Props) => {
  return (
    <>
      {viewVariant === "preview" ? (
        <MotionContainerY key={"preview"} className="flex flex-col gap-4">
          <TemplateDetailsContentPreview template={template} />
        </MotionContainerY>
      ) : (
        <MotionContainerY key={"edit"} className="flex flex-col gap-4">
          <TemplateDetailsContentEdit
            template={template}
            onViewVariantChange={onViewVariantChange}
          />
        </MotionContainerY>
      )}
    </>
  );
};

export default TemplateDetailsContent;
