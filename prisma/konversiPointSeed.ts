import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
const konversiPoint = { point: 1, nominal: 1000 };
    
await prisma.konversiPoint.create({
        data: konversiPoint,
    });
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