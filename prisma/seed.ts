import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const systemGroups = [
    "CHEST",
    "BACK",
    "LEGS",
    "SHOULDERS",
    "ARMS",
    "CORE",
    "CARDIO",
    "FULL_BODY",
  ];

  for (const name of systemGroups) {
    await prisma.muscleGroup.upsert({
      where: {
        name_userId: {
          name,
          userId: "9431cee5-11dd-4fb3-b2c6-c820d0c469fa",
        },
      },
      update: {},
      create: {
        name,
        isSystem: true,
      },
    });
  }

  console.log("✅ Default muscle groups seeded");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
