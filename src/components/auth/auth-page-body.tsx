import { cn } from "@/lib/utils";

interface Props {
  className?: string;
  children?: React.ReactNode;
}

const AuthPageBody = ({ className, children }: Props) => {
  return (
    <div className={cn("px-8 py-12 w-full h-full", className)}>{children}</div>
  );
};

export default AuthPageBody;
