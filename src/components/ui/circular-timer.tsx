"use client";

import { memo } from "react";
import { motion } from "motion/react";

interface CircularTimerProps {
  duration: number;
  elapsed: number;
  size?: number;
  strokeWidth?: number;
  isActive?: boolean;
  className?: string;
}

export const CircularTimer = memo<CircularTimerProps>(function CircularTimer({
  duration,
  elapsed,
  size = 120,
  strokeWidth = 8,
  isActive = false,
  className = "",
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const progress = Math.min(elapsed / (duration * 1000), 1);
  const strokeDashoffset = circumference - progress * circumference;

  const formatTime = (ms: number): string => {
    const totalSeconds = Math.ceil((duration * 1000 - ms) / 1000);
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const getTimerColor = (): string => {
    if (!isActive) return "text-muted-foreground";
    if (progress > 0.8) return "text-red-500";
    if (progress > 0.6) return "text-warning";
    return "text-primary";
  };

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
        role="img"
        aria-label={`Timer: ${formatTime(elapsed)} remaining`}
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          className="text-muted-foreground/20"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className={`transition-colors duration-300 ${getTimerColor()}`}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <span className="text-2xl font-bold tabular-nums font-mono">
            {formatTime(elapsed)}
          </span>
          <div className="text-xs text-muted-foreground mt-1">
            {isActive ? "Active" : "Ready"}
          </div>
        </div>
      </div>
    </div>
  );
});
