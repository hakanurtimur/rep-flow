// src/types/next-auth.d.ts

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      onboarded: boolean;
      name?: string | null;
      image?: string | null;
    };
  }

  interface User {
    id: string;
    email: string;
    onboarded: boolean;
    name?: string | null;
  }

  interface JWT {
    sub: string;
    email: string;
    onboarded: boolean;
  }
}
