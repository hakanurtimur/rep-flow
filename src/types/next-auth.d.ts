// types/next-auth.d.ts
import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string | null;
      onboarded: boolean;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    onboarded: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    email: string;
    name: string | null;
    onboarded: boolean;
  }
}
