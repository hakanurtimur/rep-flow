import AuthHeader from "@/components/auth/auth-header";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-screen h-screen relative">
      <AuthHeader className="fixed" />
      <main className="w-full h-full">{children}</main>
    </div>
  );
}
