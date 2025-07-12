import { prisma } from "@/lib/prisma";

export const createUser = async ({
  id,
  email,
}: {
  id: string;
  email: string;
}) => {
  try {
    const existing = await prisma.user.findUnique({
      where: { email },
    });

    if (existing) {
      console.log("⚠️ User already exists, skipping create");
      return existing;
    }

    return await prisma.user.create({
      data: {
        id,
        email,
        onboarded: false,
      },
    });
  } catch (err) {
    console.error("🔥 createUser error", err);
    throw new Error("createUser failed");
  }
};
