"use client";
import AuthPageBody from "@/components/auth/auth-page-body";
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

const FormSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

const Page = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <AuthPageBody className="relative">
      <div className="w-full h-full">
        <div className="flex flex-col w-full items-center justify-center h-full ">
          <div className="w-1/2 h-full flex flex-col items-center justify-center gap-4 max-w-md">
            <h1 className="text-xl  w-full font-semibold">
              Forgot Your Password?
            </h1>
            <p className="text-sm w-full mb-4">
              We will send you an email with a link to reset your password.
            </p>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit((data) => {
                  console.log(data);
                })}
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
                <Button className="cursor-pointer" variant="dark">
                  Send Reset Link
                </Button>
                <Separator className="my-4" />

                <p className="text-sm">
                  Don&#39;t have an account?{" "}
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
