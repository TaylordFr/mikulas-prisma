import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  const numberOfKids = 10;
  const toysPerKid = 3;

  for (let i = 0; i < numberOfKids; i++) {
    const kid = await prisma.kid.create({
      data: {
        name: faker.person.firstName(),
        location: faker.location.country() + ", " + faker.location.city() + ", " + faker.location.street(),
        goodorbad: faker.datatype.boolean()
      },
    });

    console.log(`Created: ${kid.name}`);

    for (let j = 0; j < toysPerKid; j++) {
      const toyName = faker.commerce.product();


      await prisma.toyToKid.create({
        data: {
          kid: {
            connect: { id: kid.id }
          },
          toy: {
            create: { name: toyName, material: faker.commerce.productMaterial(), weight: faker.number.float({fractionDigits: 1, max: 15})},
          },
        },
      })
    };
  }
}

console.log('Seeding complete!');

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
