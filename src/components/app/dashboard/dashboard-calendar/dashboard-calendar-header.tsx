"use client";

import React, { useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  AlignJustifyIcon,
  CalendarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  LayoutGridIcon,
  Tally3Icon,
} from "lucide-react";
import ExpandableButton from "@/components/ui/expandable-button";
import { AnimatePresence, motion } from "motion/react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { monthNames } from "@/components/app/dashboard/dashboard-calendar/dashboard-calendar-body";
import { CalendarPopover } from "@/components/ui/calendar-popover";
import AddLogModal from "@/components/app/dashboard/add-log-modal/add-log-modal";

const calendarOptions = [
  { mode: "yearly", label: "Yearly", icon: CalendarIcon },
  { mode: "monthly", label: "Monthly", icon: LayoutGridIcon },
  { mode: "weekly", label: "Weekly", icon: Tally3Icon },
  { mode: "daily", label: "Daily", icon: AlignJustifyIcon },
] as const;

interface Props {
  calendarMode: "monthly" | "yearly" | "weekly" | "daily";
  setCalendarMode: (mode: "monthly" | "yearly" | "weekly" | "daily") => void;
  date?: Date;
  setDate: (date: Date | undefined) => void;
  navigateDate: (direction: "prev" | "next") => void;
}

const DashboardCalendarHeader = ({
  calendarMode,
  setCalendarMode,
  date,
  setDate,
  navigateDate,
}: Props) => {
  const [modeChanged, setModeChanged] = useState(false);

  const handleModeChange = (
    newMode: "monthly" | "yearly" | "weekly" | "daily",
  ) => {
    if (calendarMode !== newMode) {
      setModeChanged(true);
      setCalendarMode(newMode);
      setTimeout(() => {
        setModeChanged(false);
      }, 200);
    }
  };

  const getDateTitle = (): string => {
    if (!date) return ""; // date tanımsızsa boş dön (ya da fallback koy)

    switch (calendarMode) {
      case "daily": {
        return date.toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        });
      }

      case "weekly": {
        const weekStart = new Date(date);
        weekStart.setDate(weekStart.getDate() - weekStart.getDay());

        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 6);

        if (weekStart.getMonth() === weekEnd.getMonth()) {
          return `${monthNames[weekStart.getMonth()]} ${weekStart.getDate()}-${weekEnd.getDate()}, ${weekStart.getFullYear()}`;
        } else {
          return `${monthNames[weekStart.getMonth()]} ${weekStart.getDate()} - ${monthNames[weekEnd.getMonth()]} ${weekEnd.getDate()}, ${weekStart.getFullYear()}`;
        }
      }

      case "monthly": {
        return `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
      }

      case "yearly": {
        return date.getFullYear().toString();
      }

      default:
        return "";
    }
  };

  return (
    <TooltipProvider>
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size={"icon"}
            onClick={() => navigateDate("prev")}
          >
            <ChevronLeftIcon className="w-4 h-4" />
          </Button>
          <CalendarPopover
            setDate={setDate}
            date={date}
            dateStr={getDateTitle()}
          />
          <Button
            variant="outline"
            size={"icon"}
            onClick={() => navigateDate("next")}
          >
            <ChevronRightIcon className="w-4 h-4" />
          </Button>
        </div>
        <div className="flex rounded-md flex-1 items-center justify-end gap-4">
          <AnimatePresence>
            {!modeChanged && (
              <motion.button
                className={buttonVariants({
                  variant: "outline",
                  className: "bg-transparent shadow-none opacity-0",
                })}
                transition={{
                  duration: 0.2,
                  delay: 0.1,
                  ease: "easeInOut",
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={() => {
                  setDate(new Date());
                }}
              >
                {calendarMode !== "daily" ? (
                  <span className="capitalize">
                    This{" "}
                    {calendarMode === "monthly"
                      ? "Month"
                      : calendarMode === "yearly"
                        ? "Year"
                        : "week"}
                  </span>
                ) : (
                  <span className="capitalize">Today</span>
                )}
              </motion.button>
            )}
          </AnimatePresence>

          <div className="flex shadow-xs border rounded-md items-center justify-end">
            {calendarOptions.map(({ mode, label, icon: Icon }) => (
              <ExpandableButton
                size="icon"
                variant="ghost"
                className="bg-transparent shadow-none cursor-pointer"
                onClick={() => handleModeChange(mode)}
                expanded={calendarMode === mode}
                expandedText={label}
                key={mode}
              >
                <Icon className="w-4 h-4" />
              </ExpandableButton>
            ))}
          </div>
          <AddLogModal>
            <Button variant="dark">Add Log</Button>
          </AddLogModal>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default DashboardCalendarHeader;
