import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Link href={"/sign-in"}>Go To Signin </Link>
    </div>
  );
}
