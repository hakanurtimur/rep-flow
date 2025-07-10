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

const FormSchema = z
  .object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters long"),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords do not match",
      });
    }
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
      <div className="right-0 h-full w-96 absolute top-0">
        <Image
          src={"/images/sign-in.jpg"}
          alt={"Sign In"}
          fill
          className="object-cover object-center"
        />
      </div>
      <div className="pr-96 w-full h-full">
        <div className="flex flex-col w-full items-center justify-center h-full">
          <div className="w-1/2 h-full flex flex-col items-center justify-center gap-4">
            <h1 className="text-xl mb-4 w-full font-semibold">Sign Up</h1>
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
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
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
                <Button className="cursor-pointer" variant="dark">
                  Sign Up
                </Button>
                <Separator className="my-4" />

                <p className="text-sm">
                  Do you have an account?{" "}
                  <Link className="font-semibold" href={"/sign-in"}>
                    Sign In
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
