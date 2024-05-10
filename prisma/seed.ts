import { PrismaClient } from '@prisma/client'
import { hash } from 'bcrypt';
const prisma = new PrismaClient()
async function main() {
const levels = [
    { kode: 1, level: 'Admin' },
    { kode: 2, level: 'Customer' },
    { kode: 3, level: 'Owner' },
    ];

    for (const level of levels) {
    await prisma.level.create({
        data: level,
    });
    }
    
  const admin = await prisma.user.upsert({
    where: { email: 'admin@gmail.com' },
    update: {},
    create: {
        name: 'Admin',
        email: 'admin@gmail.com',
        no_wa: '082373547364',
        alamat: 'Jakarta',
        password: await hash('password', 12),
        levelId: 1,
    },
  })
  console.log({ levels, admin })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })