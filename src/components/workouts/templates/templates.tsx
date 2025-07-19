"use client";

import { useState } from "react";
import PageBodyInnerContainer from "@/components/layout-related/page-body-inner-container";
import TemplatesHeader from "@/components/workouts/templates/templates-header";
import TemplateList from "@/components/workouts/templates/template-list";
import { useListWorkoutTemplates } from "@/hooks/workout-template/use-list-workout-templates";
import LoadingOverlay from "@/components/ui/loading-overlay";

const Templates = () => {
  const query = useListWorkoutTemplates();

  const [viewVariant, setViewVariant] = useState<"card" | "list">("card");

  if (query.isLoading || !query.data) {
    return <LoadingOverlay fullScreen={false} />;
  }

  console.log(query.data);

  const handleViewVariantChange = (variant: "card" | "list") => {
    setViewVariant(variant);
  };
  return (
    <PageBodyInnerContainer>
      <TemplatesHeader
        onViewVariantChange={handleViewVariantChange}
        viewVariant={viewVariant}
      />
      <TemplateList viewVariant={viewVariant} templates={query.data} />
    </PageBodyInnerContainer>
  );
};

export default Templates;
