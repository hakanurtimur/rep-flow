import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const supabase = await createSupabaseServerClient();

        const { data, error } = await supabase.auth.signInWithPassword({
          email: credentials.email,
          password: credentials.password,
        });

        if (error || !data.user) return null;

        const { id, email } = data.user;

        const user = await prisma.user.findUnique({ where: { id } });

        if (!user) return null;

        return {
          id: id,
          email: email,
          onboarded: user.onboarded,
        };
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.onboarded = user.onboarded;
      } else {
        const dbUser = await prisma.user.findUnique({
          where: { id: token.id },
          select: { onboarded: true },
        });

        token.onboarded = dbUser?.onboarded ?? false;
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub as string;
        session.user.email = token.email as string;
        session.user.onboarded = token.onboarded;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
