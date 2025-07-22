"use client";

import { useParams, useSearchParams } from "next/navigation";
import { useGetWorkoutTemplate } from "@/hooks/workout-template/use-get-workout-template";
import PageBodyInnerContainer from "@/components/layout-related/page-body-inner-container";
import LoadingOverlay from "@/components/ui/loading-overlay";
import TemplateDetailsHeader from "@/components/app/workouts/templates/template-details/template-details-header";
import TemplateDetailsContent from "@/components/app/workouts/templates/template-details/template-details-content/template-details-content";
import { useState } from "react";

const TemplateDetails = () => {
  const { templateId } = useParams();
  const [viewVariant, setViewVariant] = useState<"preview" | "edit">("preview");
  const searchParams = useSearchParams();

  const byParam = searchParams.get("by");

  const query = useGetWorkoutTemplate(templateId as string);

  if (query.isLoading || !query.data) {
    return <LoadingOverlay fullScreen={false} />;
  }

  const handleViewVariantChange = (variant: "edit" | "preview") => {
    setViewVariant(variant);
  };

  return (
    <PageBodyInnerContainer>
      <TemplateDetailsHeader
        template={query.data}
        viewVariant={viewVariant}
        onViewVariantChange={handleViewVariantChange}
        byParam={byParam}
      />
      <TemplateDetailsContent
        template={query.data}
        viewVariant={viewVariant}
        onViewVariantChange={handleViewVariantChange}
      />
    </PageBodyInnerContainer>
  );
};

export default TemplateDetails;
