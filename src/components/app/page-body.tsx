import { cn } from "@/lib/utils";

interface Props {
  className?: string;
  children?: React.ReactNode;
}

const PageBody = ({ className, children }: Props) => {
  return (
    <div className={cn("px-6 py-10 w-full h-full", className)}>{children}</div>
  );
};

export default PageBody;
