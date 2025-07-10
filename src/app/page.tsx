import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div>
      <Button asChild>
        <Link href={"/sign-in"}>Go To Signin </Link>
      </Button>
    </div>
  );
}
