import { PrismaClient } from '@prisma/client';
const db = new PrismaClient();

async function main() {
  const brand = await db.account.create({ data: { name: 'General Quarters', type: 'brand' } });
  await db.project.create({
    data: {
      accountId: brand.id,
      code: 'FA25-1602',
      name: '1602 Denim',
      type: 'dev_to_prod',
      status: 'active'
    }
  });
}

main().finally(() => db.$disconnect());
