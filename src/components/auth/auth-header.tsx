import Logo from "@/components/logo";
import { ModeToggle } from "@/components/mode-toggle";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
}

const AuthHeader = ({ className }: Props) => {
  return (
    <header
      className={cn(
        "top-4 left-0 px-4 w-full flex justify-between z-50",
        className,
      )}
    >
      <Logo></Logo>
      <ModeToggle />
    </header>
  );
};

export default AuthHeader;
