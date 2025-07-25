import { ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";

interface Props {
  children: ReactNode;
  isNavigateTriggered: "prev" | "next" | null;
  className?: string;
}
const AnimatePresenceWrapper = ({
  children,
  isNavigateTriggered,
  className,
}: Props) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{
          opacity: 0,
          x:
            isNavigateTriggered === "prev"
              ? -100
              : isNavigateTriggered === "next"
                ? 100
                : 0,
        }}
        animate={{
          opacity: 1,
          x: 0,
        }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className={cn(
          "flex items-center justify-center h-full min-w-full",
          className,
        )}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default AnimatePresenceWrapper;
