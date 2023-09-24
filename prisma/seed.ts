import { Prisma } from "@prisma/client";
import { db } from "~/server/db";
import { faker } from "@faker-js/faker";

(async () => {
  const NUMBER_OF_PROBLEMS = 100;
  const NUMBER_OF_TAGS = 10;

  const problems: Prisma.ProblemCreateInput[] = [];
  const tags: Prisma.TagCreateInput[] = [];

  for (let i = 0; i < NUMBER_OF_TAGS; i++) {
    tags.push({
      id: faker.string.uuid(),
      name: faker.lorem.word(),
    });
  }

  await db.$transaction(tags.map((tag) => db.tag.create({ data: tag })));

  for (let i = 0; i < NUMBER_OF_PROBLEMS; i++) {
    problems.push({
      id: faker.string.uuid(),
      title: faker.lorem.sentence(),
      body: faker.lorem.paragraph(),
      difficulty: faker.number.float({ min: 1, max: 10, precision: 0.1 }),
      problemTags: {
        create: {
          tag: {
            connect: {
              id: faker.helpers.arrayElement(tags).id,
            },
          },
        },
      },
    });
  }

  await db.$transaction(
    problems.map((problem) => db.problem.create({ data: problem })),
  );
  console.log(`Created ${NUMBER_OF_PROBLEMS} problems`);
})();
