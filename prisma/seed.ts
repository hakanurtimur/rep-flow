import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const userId = "9431cee5-11dd-4fb3-b2c6-c820d0c469fa";

  // Temizlik
  await prisma.templateExerciseSet.deleteMany();
  await prisma.workoutExerciseSet.deleteMany();
  await prisma.templateExercise.deleteMany();
  await prisma.workoutExercise.deleteMany();
  await prisma.workoutTemplate.deleteMany();
  await prisma.workout.deleteMany();
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

  const muscleGroups = await prisma.muscleGroup.findMany({
    where: {
      isSystem: true,
    },
  });

  // 2. Seed Exercise
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

  // 3. Seed Workout
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

  // 4. Seed WorkoutTemplate
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

  // 5. System Workout Templates
  for (let t = 0; t < 2; t++) {
    const systemTemplate = await prisma.workoutTemplate.create({
      data: {
        name: `System Template ${t + 1}`,
        description: `This is a system default template ${t + 1}`,
        isSystem: true,
        userId: null,
        duration: 20 + t * 10,
        difficulty: 2 + t,
      },
    });

    for (let i = 0; i < exercises.length; i++) {
      const te = await prisma.templateExercise.create({
        data: {
          templateId: systemTemplate.id,
          exerciseId: exercises[i].id,
          order: i,
        },
      });

      for (let j = 0; j < 2; j++) {
        await prisma.templateExerciseSet.create({
          data: {
            templateExerciseId: te.id,
            reps: 10 + j,
            weight: 25 + j * 5,
            duration: 40,
            restTime: 20,
            order: j,
          },
        });
      }
    }
  }

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
