import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create visa types
  const visaTypes = [
    { name: 'O-1' },
    { name: 'H-1A' },
    { name: 'EB-2 NIW' },
    { name: "I don't know" },
  ];

  console.log('Seeding visa types...');

  for (const visaType of visaTypes) {
    await prisma.visa.upsert({
      where: { name: visaType.name },
      update: {},
      create: visaType,
    });
    console.log(`Created/updated visa type: ${visaType.name}`);
  }

  console.log('Seeding completed!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
