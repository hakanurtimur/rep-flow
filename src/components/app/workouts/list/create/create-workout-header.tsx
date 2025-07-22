import { PageBodyInnerHeader } from "@/components/layout-related/page-body-inner-header";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React from "react";

const CreateTemplateHeader = () => {
  return (
    <PageBodyInnerHeader title={"Create Workout"}>
      <Link href={"/workouts/list"}>
        <Button>
          <ArrowLeftIcon /> Back To Workouts
        </Button>
      </Link>
    </PageBodyInnerHeader>
  );
};

export default CreateTemplateHeader;
