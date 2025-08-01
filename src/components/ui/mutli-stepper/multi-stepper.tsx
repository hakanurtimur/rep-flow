"use client";

import { ReactElement, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import MotionXWithDirection from "@/components/motioned-components/motion-container-x-with-direction";
import { cn } from "@/lib/utils";
import MotionContainerY from "@/components/motioned-components/motion-container-y";

export type MultiStepperStep = {
  id: number;
  title: string;
  icon: ReactElement;
  components: ReactElement[];
  onExtraNext?: () => boolean | Promise<boolean>;
};

type Props = {
  title?: string;
  steps: MultiStepperStep[];
  onComplete: () => void;
  onCancel: () => void;
  loading?: boolean;
  completeButtonText?: string;
  stepperClassName?: string;
  className?: string;
};

export function MultiStepper({
  title,
  steps,
  onComplete,
  onCancel,
  loading = false,
  completeButtonText = "Complete",
  stepperClassName,
  className,
}: Props) {
  const [stepIndex, setStepIndex] = useState(0);
  const currentStep = steps[stepIndex];
  const [direction, setDirection] = useState<"left" | "right">("right");

  const isLastStep = stepIndex === steps.length - 1;
  const isFirstStep = stepIndex === 0;

  const handleNext = async () => {
    setDirection("right");
    let valid = true;
    if (currentStep.onExtraNext !== undefined) {
      valid = await currentStep.onExtraNext();
    }
    if (!valid) return;
    setStepIndex((prev) => prev + 1);
  };

  const handlePrev = () => {
    setDirection("left");
    if (!isFirstStep) setStepIndex((prev) => prev - 1);
  };

  return (
    <div className={cn("space-y-4 flex flex-col justify-between", className)}>
      <div className="space-y-4 flex flex-col flex-1">
        {title && <h1 className="font-bold">{title}</h1>}
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

        <div
          className={cn(
            "flex justify-around items-center mb-8 relative",
            stepperClassName,
          )}
        >
          {steps.map((step, index) => {
            const isActive = index === stepIndex;
            const isCompleted = index < stepIndex;

            return (
              <div
                key={step.id}
                className="flex flex-col items-center relative"
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
        <Button
          disabled={loading}
          type="button"
          variant="outline"
          onClick={onCancel}
        >
          Cancel
        </Button>

        <div className="flex gap-2">
          {!isFirstStep && (
            <Button
              disabled={loading}
              type="button"
              variant="outline"
              onClick={handlePrev}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
          )}

          {isLastStep ? (
            <Button onClick={onComplete} type={"button"} loading={loading}>
              {completeButtonText}
              <CheckCircle className="ml-2 w-4 h-4" />
            </Button>
          ) : (
            <Button type={"button"} onClick={handleNext} loading={loading}>
              Next
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
