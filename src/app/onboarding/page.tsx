"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Scale,
  Target,
  User,
} from "lucide-react";
import { useOnboarding } from "@/hooks/onboarding/useOnboarding";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  // Step 1: Personal Information
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  age: z.string().min(1, "Age is required"),

  // Step 2: Physical Information
  weight: z.string().min(1, "Weight is required"),
  weightUnit: z.enum(["kg", "lbs"]),
  height: z.string().min(1, "Height is required"),
  heightUnit: z.enum(["cm", "ft"]),

  // Step 3: Goals & Preferences
  fitnessGoal: z.string().min(1, "Please select a fitness goal"),
  activityLevel: z.string().min(1, "Please select your activity level"),
  notes: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

const steps = [
  {
    id: 1,
    title: "Personal Information",
    description: "Tell us about yourself",
    icon: User,
  },
  {
    id: 2,
    title: "Physical Stats",
    description: "Your current measurements",
    icon: Scale,
  },
  {
    id: 3,
    title: "Goals & Preferences",
    description: "What do you want to achieve?",
    icon: Target,
  },
  {
    id: 4,
    title: "Complete",
    description: "Review and finish setup",
    icon: CheckCircle,
  },
];

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1);

  const mutation = useOnboarding();
  const { update } = useSession();
  const router = useRouter();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      age: "",
      weight: "",
      weightUnit: "kg",
      height: "",
      heightUnit: "cm",
      fitnessGoal: "",
      activityLevel: "",
      notes: "",
    },
  });

  const nextStep = async () => {
    let fieldsToValidate: (keyof FormData)[] = [];

    switch (currentStep) {
      case 1:
        fieldsToValidate = ["firstName", "lastName", "age"];
        break;
      case 2:
        fieldsToValidate = ["weight", "height"];
        break;
      case 3:
        fieldsToValidate = ["fitnessGoal", "activityLevel"];
        break;
    }

    const isValid = await form.trigger(fieldsToValidate);
    if (isValid && currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onSubmit = async (data: FormData) => {
    mutation.mutate({
      ...data,
      weight: parseInt(data.weight),
      height: parseInt(data.height),
    });
    console.log("Form submitted:", data);
    setCurrentStep(4);
  };

  const handleDashboard = async () => {
    try {
      await update();
      router.push("/dashboard");
    } catch (error) {
      console.error("Session update failed", error);
    }
  };
  const progress = (currentStep / steps.length) * 100;

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome To RepFlow! Let's get you set up
          </h1>
          <p className="text-muted-foreground">
            Complete your profile to get personalized recommendations
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-foreground">
              Step {currentStep} of {steps.length}
            </span>
            <span className="text-sm text-muted-foreground">
              {Math.round(progress)}% complete
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Stepper */}
        <div className="flex justify-between items-center mb-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = currentStep === step.id;
            const isCompleted = currentStep > step.id;

            return (
              <div key={step.id} className="flex flex-col items-center flex-1">
                <div
                  className={`
                  w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-colors
                  ${
                    isCompleted
                      ? "bg-primary text-primary-foreground"
                      : isActive
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                  }
                `}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div className="text-center">
                  <p
                    className={`text-xs font-medium ${isActive ? "text-primary" : "text-muted-foreground"}`}
                  >
                    {step.title}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`
                    hidden sm:block absolute h-0.5 w-full top-5 left-1/2 -z-10
                    ${isCompleted ? "bg-primary" : "bg-border"}
                  `}
                    style={{ transform: "translateX(50%)" }}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Form Card */}
        <Card className="shadow-lg border">
          <CardHeader>
            <CardTitle className="text-foreground">
              {steps[currentStep - 1]?.title}
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              {steps[currentStep - 1]?.description}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                {/* Step 1: Personal Information */}
                {currentStep === 1 && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter your first name"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter your last name"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="age"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Age</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="Enter your age"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}

                {/* Step 2: Physical Information */}
                {currentStep === 2 && (
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="weight"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Weight</FormLabel>
                          <div className="flex gap-2">
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="Enter your weight"
                                className="flex-1"
                                {...field}
                              />
                            </FormControl>
                            <FormField
                              control={form.control}
                              name="weightUnit"
                              render={({ field }) => (
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger className="w-20">
                                      <SelectValue />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="kg">kg</SelectItem>
                                    <SelectItem value="lbs">lbs</SelectItem>
                                  </SelectContent>
                                </Select>
                              )}
                            />
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="height"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Height</FormLabel>
                          <div className="flex gap-2">
                            <FormControl>
                              <Input
                                type="number"
                                placeholder={
                                  form.watch("heightUnit") === "cm"
                                    ? "Enter height in cm"
                                    : "Enter height in feet"
                                }
                                className="flex-1"
                                {...field}
                              />
                            </FormControl>
                            <FormField
                              control={form.control}
                              name="heightUnit"
                              render={({ field }) => (
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger className="w-20">
                                      <SelectValue />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="cm">cm</SelectItem>
                                    <SelectItem value="ft">ft</SelectItem>
                                  </SelectContent>
                                </Select>
                              )}
                            />
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}

                {/* Step 3: Goals & Preferences */}
                {currentStep === 3 && (
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="fitnessGoal"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Primary Fitness Goal</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select your primary goal" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="weight-loss">
                                Weight Loss
                              </SelectItem>
                              <SelectItem value="muscle-gain">
                                Muscle Gain
                              </SelectItem>
                              <SelectItem value="maintenance">
                                Maintain Current Weight
                              </SelectItem>
                              <SelectItem value="endurance">
                                Improve Endurance
                              </SelectItem>
                              <SelectItem value="strength">
                                Build Strength
                              </SelectItem>
                              <SelectItem value="general-fitness">
                                General Fitness
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="activityLevel"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Current Activity Level</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select your activity level" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="sedentary">
                                Sedentary (little to no exercise)
                              </SelectItem>
                              <SelectItem value="lightly-active">
                                Lightly Active (1-3 days/week)
                              </SelectItem>
                              <SelectItem value="moderately-active">
                                Moderately Active (3-5 days/week)
                              </SelectItem>
                              <SelectItem value="very-active">
                                Very Active (6-7 days/week)
                              </SelectItem>
                              <SelectItem value="extremely-active">
                                Extremely Active (2x/day or intense training)
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="notes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Additional Notes (Optional)</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Any additional information you'd like to share..."
                              rows={3}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}

                {/* Step 4: Complete */}
                {currentStep === 4 && (
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">
                      Setup Complete!
                    </h3>
                    <p className="text-muted-foreground">
                      Thank you for completing your profile. You're all set to
                      start your fitness journey!
                    </p>
                    <div className="bg-muted rounded-lg p-4 text-left">
                      <h4 className="font-medium text-foreground mb-2">
                        Your Profile Summary:
                      </h4>
                      <div className="text-sm text-muted-foreground space-y-1">
                        <p>
                          <strong className="text-foreground">Name:</strong>{" "}
                          {form.watch("firstName")} {form.watch("lastName")}
                        </p>
                        <p>
                          <strong className="text-foreground">Age:</strong>{" "}
                          {form.watch("age")} years old
                        </p>
                        <p>
                          <strong className="text-foreground">Weight:</strong>{" "}
                          {form.watch("weight")} {form.watch("weightUnit")}
                        </p>
                        <p>
                          <strong className="text-foreground">Height:</strong>{" "}
                          {form.watch("height")} {form.watch("heightUnit")}
                        </p>
                        <p>
                          <strong className="text-foreground">Goal:</strong>{" "}
                          {form.watch("fitnessGoal")?.replace("-", " ")}
                        </p>
                        <p>
                          <strong className="text-foreground">
                            Activity Level:
                          </strong>{" "}
                          {form.watch("activityLevel")?.replace("-", " ")}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between pt-6">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                    disabled={currentStep === 1 || currentStep === 4}
                    className="flex items-center gap-2 bg-transparent"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Previous
                  </Button>

                  {currentStep < 3 ? (
                    <Button
                      type="button"
                      onClick={nextStep}
                      className="flex items-center gap-2"
                    >
                      Next
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  ) : currentStep === 3 ? (
                    <Button
                      type="submit"
                      disabled={mutation.isPending}
                      className="flex items-center gap-2"
                    >
                      {mutation.isPending ? "Completing..." : "Complete Setup"}
                      <CheckCircle className="w-4 h-4" />
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      onClick={handleDashboard}
                      className="flex items-center gap-2"
                    >
                      Go to Dashboard
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
