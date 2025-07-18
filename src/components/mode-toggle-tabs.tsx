"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import ExpandableButton from "@/components/ui/expandable-button";
import { MoonIcon, SunIcon } from "lucide-react";

export function ModeToggleTabs() {
  const { setTheme, theme } = useTheme();

  const handleThemeChange = (theme: string) => {
    setTheme(theme);
  };

  return (
    <div className="flex shadow-xs border rounded-md items-center justify-end">
      <ExpandableButton
        size="icon"
        variant="ghost"
        onClick={() => {
          if (theme !== "light") {
            handleThemeChange("light");
          }
        }}
        className="bg-transparent shadow-none cursor-pointer"
        expandedText="Light Mode"
        expanded={theme === "light"}
      >
        <SunIcon className="w-4 h-4" />
      </ExpandableButton>
      <ExpandableButton
        size="icon"
        variant="ghost"
        onClick={() => {
          if (theme !== "dark") {
            handleThemeChange("dark");
          }
        }}
        className="bg-transparent shadow-none cursor-pointer"
        expandedText="Dark Mode"
        expanded={theme === "dark"}
      >
        <MoonIcon className="w-4 h-4" />
      </ExpandableButton>
    </div>
  );
}
