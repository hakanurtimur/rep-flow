import * as React from "react";
import type { VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { AnimatePresence, motion } from "motion/react";
import ClientOnly from "@/components/wrappers/client-only";

export default function ExpandableButton({
  onClick,
  expandedText,
  expanded,
  className,
  variant,
  size,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
  onClick: () => void;
  expandedText: string;
  expanded: boolean;
} & VariantProps<typeof buttonVariants>) {
  return (
    <ClientOnly>
      <motion.div
        onClick={onClick}
        transition={{ duration: 0.1, ease: "easeInOut" }}
        className={cn(
          buttonVariants({ variant, size, className }),
          "overflow-hidden whitespace-nowrap min-w-fit px-3",
        )}
      >
        {children}
        <AnimatePresence>
          {expanded && (
            <motion.div
              key="expanded-text"
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              transition={{ duration: 0.1 }}
            >
              {expandedText}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </ClientOnly>
  );
}
