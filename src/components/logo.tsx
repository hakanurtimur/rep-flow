import Image from "next/image";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
}

const Logo = ({ className }: Props) => {
  return (
    <Image
      width={263}
      height={69}
      className={cn("w-[270px] h-[70px]", className)}
      src={"/images/logo.jpg"}
      alt="repflow"
    />
  );
};

export default Logo;
