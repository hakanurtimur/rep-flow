import Icon from "@/components/icon";
import { cn } from "@/lib/utils";

interface Props {
  fullScreen: boolean;
}

const LoadingOverlay = ({ fullScreen = false }: Props) => {
  return (
    <div
      className={cn(
        fullScreen ? "fixed" : "absolute",
        "inset-0 flex items-center justify-center w-full h-full",
      )}
    >
      <Icon size={"large"} variant={"light"} />
    </div>
  );
};

export default LoadingOverlay;
