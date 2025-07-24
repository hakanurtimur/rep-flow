"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface TimePickerProps {
  date: Date | undefined;
  onDateChange: (date: Date | undefined) => void;
  disabled?: boolean;
}

export function TimePicker({ date, onDateChange, disabled }: TimePickerProps) {
  const [hours, setHours] = React.useState(date?.getHours() ?? 0);
  const [minutes, setMinutes] = React.useState(date?.getMinutes() ?? 0);

  React.useEffect(() => {
    if (date) {
      setHours(date.getHours());
      setMinutes(date.getMinutes());
    }
  }, [date]);

  const updateTime = React.useCallback(
    (newHours: number, newMinutes: number) => {
      if (!date) return;

      try {
        const newDate = new Date(date.getTime());
        newDate.setHours(newHours, newMinutes, 0, 0);

        if (typeof onDateChange === "function") {
          onDateChange(newDate);
        }
      } catch (error) {
        console.error("Error updating time:", error);
      }
    },
    [date, onDateChange],
  );

  const handleHoursChange = React.useCallback(
    (value: string) => {
      const newHours = Math.max(0, Math.min(23, Number.parseInt(value) || 0));
      setHours(newHours);
      updateTime(newHours, minutes);
    },
    [minutes, updateTime],
  );

  const handleMinutesChange = React.useCallback(
    (value: string) => {
      const newMinutes = Math.max(0, Math.min(59, Number.parseInt(value) || 0));
      setMinutes(newMinutes);
      updateTime(hours, newMinutes);
    },
    [hours, updateTime],
  );

  const adjustTime = React.useCallback(
    (type: "hours" | "minutes", increment: boolean) => {
      if (type === "hours") {
        const newHours = increment
          ? (hours + 1) % 24
          : hours === 0
            ? 23
            : hours - 1;
        setHours(newHours);
        updateTime(newHours, minutes);
      } else {
        const newMinutes = increment
          ? (minutes + 15) % 60
          : minutes === 0
            ? 45
            : Math.max(0, minutes - 15);
        setMinutes(newMinutes);
        updateTime(hours, newMinutes);
      }
    },
    [hours, minutes, updateTime],
  );

  const setPresetTime = React.useCallback(
    (presetHours: number, presetMinutes = 0) => {
      setHours(presetHours);
      setMinutes(presetMinutes);
      updateTime(presetHours, presetMinutes);
    },
    [updateTime],
  );

  if (!date) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center gap-4">
        <div className="flex flex-col items-center gap-2">
          <Label
            htmlFor="hours"
            className="text-xs text-muted-foreground font-medium"
          >
            Hours
          </Label>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 touch-manipulation hover:bg-muted"
              onClick={() => adjustTime("hours", false)}
              disabled={disabled}
              type="button"
            >
              -
            </Button>
            <Input
              id="hours"
              className="w-14 h-10 text-center text-lg font-mono p-1 border-2"
              value={hours.toString().padStart(2, "0")}
              onChange={(e) => handleHoursChange(e.target.value)}
              disabled={disabled}
              inputMode="numeric"
              pattern="[0-9]*"
            />
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 touch-manipulation hover:bg-muted"
              onClick={() => adjustTime("hours", true)}
              disabled={disabled}
              type="button"
            >
              +
            </Button>
          </div>
        </div>

        <div className="text-2xl font-bold text-muted-foreground mt-6">:</div>

        <div className="flex flex-col items-center gap-2">
          <Label
            htmlFor="minutes"
            className="text-xs text-muted-foreground font-medium"
          >
            Minutes
          </Label>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 touch-manipulation hover:bg-muted"
              onClick={() => adjustTime("minutes", false)}
              disabled={disabled}
              type="button"
            >
              -
            </Button>
            <Input
              id="minutes"
              className="w-14 h-10 text-center text-lg font-mono p-1 border-2"
              value={minutes.toString().padStart(2, "0")}
              onChange={(e) => handleMinutesChange(e.target.value)}
              disabled={disabled}
              inputMode="numeric"
              pattern="[0-9]*"
            />
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 touch-manipulation hover:bg-muted"
              onClick={() => adjustTime("minutes", true)}
              disabled={disabled}
              type="button"
            >
              +
            </Button>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-xs text-muted-foreground font-medium">
          Quick Select
        </Label>
        <div className="grid grid-cols-4 gap-2">
          <Button
            variant="outline"
            size="sm"
            className="h-8 px-2 text-xs bg-transparent hover:bg-muted"
            onClick={() => {
              const now = new Date();
              setPresetTime(now.getHours(), now.getMinutes());
            }}
            disabled={disabled}
            type="button"
          >
            Now
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-8 px-2 text-xs bg-transparent hover:bg-muted"
            onClick={() => setPresetTime(9, 0)}
            disabled={disabled}
            type="button"
          >
            9:00
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-8 px-2 text-xs bg-transparent hover:bg-muted"
            onClick={() => setPresetTime(12, 0)}
            disabled={disabled}
            type="button"
          >
            12:00
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-8 px-2 text-xs bg-transparent hover:bg-muted"
            onClick={() => setPresetTime(17, 0)}
            disabled={disabled}
            type="button"
          >
            17:00
          </Button>
        </div>
      </div>
    </div>
  );
}
