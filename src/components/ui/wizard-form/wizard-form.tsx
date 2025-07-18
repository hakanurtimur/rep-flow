"use client";

import { ReactElement, useState } from "react";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import MotionXWithDirection from "@/components/motioned-components/motion-container-x-with-direction";
import { cn } from "@/lib/utils";
import MotionContainerY from "@/components/motioned-components/motion-container-y";

export type WizardStep<T extends FieldValues> = {
  id: number;
  title: string;
  icon: ReactElement;
  components: ReactElement[];
  fields: Path<T>[];
};

type Props<T extends FieldValues> = {
  title?: string;
  steps: WizardStep<T>[];
  form: UseFormReturn<T>;
  onSubmit: (values: T) => void;
  onCancel: () => void;
  loading?: boolean;
  completeButtonText?: string;
  className?: string;
};

export function WizardForm<T extends FieldValues>({
  title,
  steps,
  form,
  onSubmit,
  onCancel,
  loading = false,
  completeButtonText = "Complete",
  className,
}: Props<T>) {
  const [stepIndex, setStepIndex] = useState(0);
  const currentStep = steps[stepIndex];
  const [direction, setDirection] = useState<"left" | "right">("right");

  const isLastStep = stepIndex === steps.length - 1;
  const isFirstStep = stepIndex === 0;

  const handleNext = async () => {
    setDirection("right");
    const valid = await form.trigger(currentStep.fields);
    if (!valid) return;
    setStepIndex((prev) => prev + 1);
  };

  const handlePrev = () => {
    setDirection("left");
    if (!isFirstStep) setStepIndex((prev) => prev - 1);
  };

  return (
    <Form {...form}>
      <form
        className={cn("space-y-4 flex flex-col justify-between", className)}
      >
        {/* Header */}
        <div className="space-y-4 flex flex-col flex-1">
          {title && <h1 className="font-bold">{title}</h1>}
          {/* Progress */}
          <MotionXWithDirection direction={direction}>
            <div className="flex text-sm font-medium mb-1 gap-2">
              <span>
                Step {stepIndex + 1} of {steps.length}:
              </span>
              <MotionContainerY
                key={currentStep.title}
                className="text-sm text-muted-foreground"
              >
                {currentStep.title}
              </MotionContainerY>
            </div>
          </MotionXWithDirection>

          {/* Stepper */}
          <div className="flex justify-between items-center mb-8 relative">
            {steps.map((step, index) => {
              const isActive = index === stepIndex;
              const isCompleted = index < stepIndex;

              return (
                <div
                  key={step.id}
                  className="flex flex-col items-center flex-1 relative"
                >
                  <div
                    className={`
                    w-10 h-10 rounded-full flex items-center justify-center mb-2 
                    transition-colors duration-300 border
                    ${isCompleted ? "bg-primary text-primary-foreground border-primary" : isActive ? "bg-accent text-accent-foreground border-accent" : "bg-background text-foreground border-foreground"}
                  `}
                  >
                    {step.icon}
                  </div>
                  <p
                    className={`text-xs font-medium text-center ${
                      isActive ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    {step.title}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Current Step Fields */}
          <MotionXWithDirection
            direction={direction}
            className="space-y-4 flex flex-col"
            key={stepIndex}
          >
            {currentStep.components.map((Component, i) => (
              <div className="h-full flex flex-col" key={i}>
                {Component}
              </div>
            ))}
          </MotionXWithDirection>
        </div>

        {/* Buttons */}
        <div className="flex justify-between pt-6">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>

          <div className="flex gap-2">
            {!isFirstStep && (
              <Button type="button" variant="outline" onClick={handlePrev}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>
            )}

            {isLastStep ? (
              <Button
                type={"button"}
                loading={loading}
                onClick={form.handleSubmit((data) => {
                  onSubmit(data);
                })}
              >
                <>
                  {completeButtonText}
                  <CheckCircle className="ml-2 w-4 h-4" />
                </>
              </Button>
            ) : (
              <Button type={"button"} onClick={handleNext} loading={loading}>
                Next
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </form>
    </Form>
  );
}
