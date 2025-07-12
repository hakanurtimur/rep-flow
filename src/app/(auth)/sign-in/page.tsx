"use client";
import AuthPageBody from "@/components/auth/auth-page-body";
import Image from "next/image";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useSignin } from "@/hooks/auth/use-signin";

const FormSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

const Page = () => {
  const { login } = useSignin();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    await login(
      {
        email: data.email,
        password: data.password,
      },
      {
        onSuccess: () => {
          toast.success("Login successful");
          router.push("/dashboard");
        },
        onError: (err: any) => {
          toast.error(err.message ?? "Login failed");
        },
      },
    );
  };

  return (
    <AuthPageBody className="relative">
      <div className="left-0 h-full w-96 absolute top-0">
        <Image
          src={"/images/sign-in.jpg"}
          alt={"Sign In"}
          fill
          className="object-cover object-center"
        />
      </div>
      <div className="pl-96 w-full h-full">
        <div className="flex flex-col w-full items-center justify-center h-full">
          <div className="w-1/2 h-full flex flex-col items-center justify-center gap-4">
            <h1 className="text-xl mb-4 w-full font-semibold">Sign In</h1>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-4 w-full justify-center"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="shadcn" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type={"password"}
                          placeholder="shadcn"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Link href={"/forgot-password"}>
                  <p className="text-muted-foreground text-sm">
                    Forgot Password ?
                  </p>
                </Link>
                <Button className="cursor-pointer" variant="dark">
                  Sign In
                </Button>
                <Separator className="my-4" />

                <p className="text-sm">
                  Don't have an account?{" "}
                  <Link className="font-semibold" href={"/sign-up"}>
                    Create One
                  </Link>
                </p>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </AuthPageBody>
  );
};

export default Page;
