"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";

interface PageTitleProps {
  text: string;
  className?: string;
}

export function PageBodyInnerTitle({ text, className }: PageTitleProps) {
  return (
    <motion.h1
      initial={{ opacity: 0, width: 0 }}
      animate={{ opacity: 1, width: "auto" }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={cn(
        "text-xl md:text-2xl lg:text-3xl font-semibold tracking-tight whitespace-nowrap",
        "bg-gradient-to-l from-primary from-65% to-tertiary",
        "bg-clip-text text-transparent",
        className,
      )}
    >
      {text}
    </motion.h1>
  );
}
