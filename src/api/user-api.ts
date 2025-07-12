import api from "@/lib/axios-client";
import { signIn } from "next-auth/react";

type SignUpPayload = {
  email: string;
  password: string;
};

export const signUp = async (data: SignUpPayload) => {
  return await api.post<SignUpPayload, any>("auth/signup", data);
};

export const signInAction = async (email: string, password: string) => {
  const res = await signIn("credentials", {
    redirect: false,
    email,
    password,
  });

  if (!res?.ok) {
    return { success: false, error: res?.error || "Sign In failed" };
  }

  return { success: true };
};

export const postOnboarding = async (data: any) => {
  return await api.post("/user/onboarding", data);
};
