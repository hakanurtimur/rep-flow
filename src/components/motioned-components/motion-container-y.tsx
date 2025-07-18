import { motion } from "motion/react";

interface Props {
  children?: React.ReactNode;
  className?: string;
}

const MotionContainerY = ({ children, className }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default MotionContainerY;
