"use client";

import Logo from "@/components/logo";
import { ModeToggle } from "@/components/mode-toggle";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

interface Props {
  className?: string;
}

const AuthHeader = ({ className }: Props) => {
  const pathname = usePathname();

  return (
    <header
      className={cn(
        "top-4 left-0 px-4 w-full flex justify-between z-50 items-center",
        className,
      )}
    >
      <Logo
        variant={pathname.startsWith("/sign-in") ? "dark" : "light"}
        size={"large"}
      />
      <ModeToggle />
    </header>
  );
};

export default AuthHeader;
