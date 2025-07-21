import PageBodyInnerContainer from "@/components/layout-related/page-body-inner-container";
import CreateTemplateHeader from "@/components/app/workouts/templates/create/create-template-header";
import CreateTemplateContent from "@/components/app/workouts/templates/create/create-template-content/create-template-content";

const CreateTemplate = () => {
  return (
    <PageBodyInnerContainer>
      <CreateTemplateHeader />
      <CreateTemplateContent />
    </PageBodyInnerContainer>
  );
};

export default CreateTemplate;
