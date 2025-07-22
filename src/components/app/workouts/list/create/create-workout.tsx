import PageBodyInnerContainer from "@/components/layout-related/page-body-inner-container";
import CreateWorkoutHeader from "@/components/app/workouts/list/create/create-workout-header";
import CreateWorkoutContent from "@/components/app/workouts/list/create/create-workout-content/create-workout-content";

const CreateWorkout = () => {
  return (
    <PageBodyInnerContainer>
      <CreateWorkoutHeader />
      <CreateWorkoutContent />
    </PageBodyInnerContainer>
  );
};

export default CreateWorkout;
