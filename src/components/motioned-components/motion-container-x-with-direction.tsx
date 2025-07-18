import { motion } from "motion/react";

interface Props {
  children?: React.ReactNode;
  className?: string;
  direction?: "left" | "right";
}

const MotionXWithDirection = ({ children, className, direction }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: direction === "left" ? -20 : 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default MotionXWithDirection;
