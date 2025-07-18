import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const userId = "9431cee5-11dd-4fb3-b2c6-c820d0c469fa";

  // Temizlik
  await prisma.exerciseMuscleGroup.deleteMany();
  await prisma.exercise.deleteMany();
  await prisma.muscleGroup.deleteMany();

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

  // 1. Seed Muscle Groups
  for (const name of systemGroups) {
    await prisma.muscleGroup.create({
      data: {
        name,
        isSystem: true,
        userId: null,
      },
    });
  }

  // 2. Fetch muscle groups
  const muscleGroups = await prisma.muscleGroup.findMany({
    where: {
      isSystem: true,
      userId: null,
    },
  });

  // 3. One exercise shared by all groups with different difficulties
  const defaultExercise = await prisma.exercise.create({
    data: {
      name: "Multi Group Default Exercise",
      description: "Covers multiple groups",
      isSystem: true,
      userId: null,
      totalDifficulty: 0, // sonra güncellenecek
    },
  });

  // 4. Link exercise to muscle groups with individual difficulties
  let total = 0;
  for (const group of muscleGroups) {
    const diff = Math.floor(Math.random() * 3) + 1; // 1-3 arası rastgele zorluk
    total += diff;

    await prisma.exerciseMuscleGroup.create({
      data: {
        exerciseId: defaultExercise.id,
        muscleGroupId: group.id,
        difficulty: diff,
      },
    });
  }

  // 5. Update total difficulty
  await prisma.exercise.update({
    where: { id: defaultExercise.id },
    data: {
      totalDifficulty: total,
    },
  });

  console.log("✅ Seed completed with multi-group exercise");
}

main()
  .catch((e) => {
    console.error("❌ Error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
