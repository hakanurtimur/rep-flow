import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const userId = "9a3f3b18-76d8-49ac-b623-6bf8651bd3df";

  // 1. Temizlik
  await prisma.workoutTemplateOnWorkout.deleteMany();
  await prisma.templateExerciseSet.deleteMany();
  await prisma.workoutExerciseSet.deleteMany();
  await prisma.templateExercise.deleteMany();
  await prisma.workoutExercise.deleteMany();
  await prisma.workoutTemplate.deleteMany();
  await prisma.workout.deleteMany();
  await prisma.exerciseMuscleGroup.deleteMany();
  await prisma.exercise.deleteMany();
  await prisma.muscleGroup.deleteMany();

  // 2. Muscle Group ekle
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
    await prisma.muscleGroup.create({
      data: { name, isSystem: true },
    });
  }

  const muscleGroups = await prisma.muscleGroup.findMany({
    where: { isSystem: true },
  });

  // 3. Exercise ekle
  const exercises = [];
  for (let i = 0; i < 3; i++) {
    const exercise = await prisma.exercise.create({
      data: {
        name: `Exercise ${i + 1}`,
        description: `Desc for exercise ${i + 1}`,
        isSystem: true,
        totalDifficulty: 5,
      },
    });

    for (const mg of muscleGroups.slice(0, 3)) {
      await prisma.exerciseMuscleGroup.create({
        data: {
          exerciseId: exercise.id,
          muscleGroupId: mg.id,
          difficulty: Math.floor(Math.random() * 3) + 1,
        },
      });
    }

    exercises.push(exercise);
  }

  // 4. Workout ekle
  const workout = await prisma.workout.create({
    data: {
      name: "Seed Workout 1",
      description: "Seeded workout for demo",
      userId,
      duration: 30,
      difficulty: 5,
    },
  });

  for (let i = 0; i < exercises.length; i++) {
    const we = await prisma.workoutExercise.create({
      data: {
        workoutId: workout.id,
        exerciseId: exercises[i].id,
        order: i,
      },
    });

    for (let j = 0; j < 3; j++) {
      await prisma.workoutExerciseSet.create({
        data: {
          workoutExerciseId: we.id,
          reps: 10 + j,
          weight: 20 + j * 5,
          duration: 60,
          restTime: 30,
          order: j,
        },
      });
    }
  }

  // 5. Workout Template oluştur
  const template = await prisma.workoutTemplate.create({
    data: {
      name: "Template 1",
      description: "Sample Template",
      userId,
      duration: 25,
      difficulty: 3,
    },
  });

  for (let i = 0; i < exercises.length; i++) {
    const te = await prisma.templateExercise.create({
      data: {
        templateId: template.id,
        exerciseId: exercises[i].id,
        order: i,
      },
    });

    for (let j = 0; j < 3; j++) {
      await prisma.templateExerciseSet.create({
        data: {
          templateExerciseId: te.id,
          reps: 8 + j,
          weight: 15 + j * 5,
          duration: 45,
          restTime: 30,
          order: j,
        },
      });
    }
  }

  // 6. Workout <-> Template bağlantısını pivot tabloya ekle
  await prisma.workoutTemplateOnWorkout.create({
    data: {
      workoutId: workout.id,
      templateId: template.id,
    },
  });

  console.log("✅ Seed completed.");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
