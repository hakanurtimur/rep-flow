"use client";

import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon, ClockIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { TimePicker } from "./time-picker";
import ExpandableButton from "@/components/ui/expandable-button";
import { toast } from "sonner";

interface DateTimePickerProps {
  date?: Date;
  onDateChange: (date: Date | undefined) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

const viewVariants = [
  { mode: "date", label: "Date", icon: CalendarIcon },
  { mode: "time", label: "Time", icon: ClockIcon },
];

export function DateTimePicker({
  date,
  onDateChange,
  placeholder = "Pick a date and time",
  disabled = false,
  className,
}: DateTimePickerProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(
    date,
  );

  console.log(date);
  const [step, setStep] = React.useState<"date" | "time">("date");

  const handleDateSelect = React.useCallback(
    (newDate: Date | undefined) => {
      if (!newDate) {
        setSelectedDate(undefined);
        if (typeof onDateChange === "function") {
          onDateChange(undefined);
        }
        return;
      }

      try {
        let updatedDate: Date;

        if (selectedDate) {
          updatedDate = new Date(newDate.getTime());
          updatedDate.setHours(
            selectedDate.getHours(),
            selectedDate.getMinutes(),
            0,
            0,
          );
        } else {
          const now = new Date();
          updatedDate = new Date(newDate.getTime());
          updatedDate.setHours(now.getHours(), now.getMinutes(), 0, 0);
        }

        setSelectedDate(updatedDate);

        // Ensure the callback is called safely
        if (typeof onDateChange === "function") {
          onDateChange(updatedDate);
        }

        // Auto-advance to time step
        setStep("time");
      } catch (error) {
        console.error("Error in handleDateSelect:", error);
      }
    },
    [selectedDate, onDateChange],
  );

  const handleTimeChange = React.useCallback(
    (newDate: Date | undefined) => {
      if (newDate) {
        setSelectedDate(newDate);
        if (typeof onDateChange === "function") {
          onDateChange(newDate);
        }
      }
    },
    [onDateChange],
  );

  const handleComplete = React.useCallback(() => {
    setIsOpen(false);
    setStep("date"); // Reset for next time
  }, []);

  const handleBack = React.useCallback(() => {
    setStep("date");
  }, []);

  // Update internal state when prop changes
  React.useEffect(() => {
    setSelectedDate(date);
  }, [date]);

  // Reset step when popover opens
  React.useEffect(() => {
    if (isOpen) {
      setStep(selectedDate ? "time" : "date");
    }
  }, [isOpen, selectedDate]);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            !selectedDate && "text-muted-foreground",
            className,
          )}
          disabled={disabled}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {selectedDate ? (
            format(selectedDate, "PPP 'at' HH:mm")
          ) : (
            <span>{placeholder}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent side={"right"} className="w-auto p-0" align="start">
        {/* Header with Steps */}
        <div className="flex items-center justify-between p-3 border-b bg-muted/30">
          <div className="flex items-center gap-2">
            <div className="flex shadow-xs border rounded-md items-center justify-end">
              {viewVariants.map(({ mode, label, icon: Icon }) => (
                <ExpandableButton
                  size="icon"
                  variant="ghost"
                  className="bg-transparent shadow-none cursor-pointer"
                  onClick={() => {
                    if (mode === "date") {
                      setStep(mode as "date" | "time");
                    } else {
                      if (selectedDate) {
                        setStep(mode as "date" | "time");
                      } else {
                        toast("Please select a date before time.");
                      }
                    }
                  }}
                  expanded={step === mode}
                  expandedText={label}
                  key={mode}
                >
                  <Icon className="w-4 h-4" />
                </ExpandableButton>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="relative overflow-hidden">
          {/* Date Step */}
          <div
            className={cn(
              "transition-transform duration-300 ease-in-out",
              step === "date"
                ? "translate-x-0"
                : "-translate-x-full absolute top-0 left-0",
            )}
          >
            <div className="p-3">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={handleDateSelect}
                initialFocus={step === "date"}
              />
            </div>
          </div>

          {/* Time Step */}
          <div
            className={cn(
              "transition-transform duration-300 ease-in-out",
              step === "time"
                ? "translate-x-0"
                : "translate-x-full absolute top-0 left-0 w-full",
            )}
          >
            {selectedDate && (
              <div className="p-3 w-80">
                <div className="mb-4">
                  <div className="text-sm text-muted-foreground mb-1">
                    Selected Date
                  </div>
                  <div className="text-sm font-medium p-2 bg-muted/50 rounded-md">
                    {format(selectedDate, "EEEE, MMMM d, yyyy")}
                  </div>
                </div>

                <TimePicker
                  date={selectedDate}
                  onDateChange={handleTimeChange}
                />

                <div className="flex gap-2 mt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 bg-transparent"
                    onClick={handleBack}
                  >
                    Back
                  </Button>
                  <Button size="sm" className="flex-1" onClick={handleComplete}>
                    Done
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
