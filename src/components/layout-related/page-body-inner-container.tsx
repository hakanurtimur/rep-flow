import { cn } from "@/lib/utils";

interface Props {
  className?: string;
  children?: React.ReactNode;
}

const PageBodyInnerContainer = ({ className, children }: Props) => {
  return (
    <div className={cn("flex flex-col gap-4 w-full", className)}>
      {children}
    </div>
  );
};

export default PageBodyInnerContainer;
