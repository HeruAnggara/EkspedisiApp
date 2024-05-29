import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
    const menu = [
        {"levelId": 1, "menuId": "b638ab59-78fc-4301-ba12-cdfb46f9f96d"},
        {"levelId": 1, "menuId": "0b575822-d3b1-4507-aad8-ab626ad20900"},
        {"levelId": 1, "menuId": "86accf8d-4fc4-4603-8b41-dcfffd4ed926"},
        {"levelId": 1, "menuId": "5bcf7f75-2878-4480-a5bd-ce1573d410d0"},
        {"levelId": 1, "menuId": "b9298178-8953-4e78-a5ac-a9505568b0b0"},
        {"levelId": 1, "menuId": "cd095c51-85f2-4838-bcad-200f45e0bb80"},
        {"levelId": 1, "menuId": "1affe5f9-7724-4c12-9db6-50f2a8e4539a"},
        {"levelId": 1, "menuId": "7fc352b7-c350-4112-a150-c5c793c94e0b"},
        {"levelId": 1, "menuId": "0c86d9c1-0c80-46cf-9bac-3ee02d483cd4"},
        {"levelId": 1, "menuId": "09e083e0-6966-4ce0-82f4-b385d5a04d13"},
        {"levelId": 1, "menuId": "65b7eb20-a39f-479a-8a88-416f61c8e505"},
        {"levelId": 1, "menuId": "6fcb515c-66b4-4682-8076-ceb2298bf7b2"},
        {"levelId": 1, "menuId": "e8a68d6e-acfe-4efa-9d87-37bee90fe30c"},
        {"levelId": 1, "menuId": "04c00156-7996-4d23-8bb7-36d4cccbb1fb"},
        {"levelId": 1, "menuId": "5f86cf35-a033-4cb4-ba18-b6ae7be69587"},
        {"levelId": 1, "menuId": "78ff8c48-f2b9-4666-a88d-be743e0d5997"},
        {"levelId": 1, "menuId": "4baf32bf-5adc-47ca-b3db-5e264e6112b8"},
        {"levelId": 1, "menuId": "a3b24ce9-823d-4e27-b0e9-260afdcf7c19"},
        {"levelId": 1, "menuId": "09044924-a688-47a9-b438-c4c772eb2bd6"},
        {"levelId": 1, "menuId": "fc284ae6-27c3-4e18-ade2-c61d2d9dc3e6"},
        {"levelId": 1, "menuId": "6b28a6cf-bab9-4130-9442-04dc89f831ef"},
        {"levelId": 1, "menuId": "66644c75-a961-42ef-8a3e-8632872a1396"},
        {"levelId": 1, "menuId": "334864e2-c0bb-4ea1-9a34-c574a6db81cc"},
        {"levelId": 2, "menuId": "b638ab59-78fc-4301-ba12-cdfb46f9f96d"},
        {"levelId": 2, "menuId": "86accf8d-4fc4-4603-8b41-dcfffd4ed926"},
        {"levelId": 2, "menuId": "5bcf7f75-2878-4480-a5bd-ce1573d410d0"},
        {"levelId": 2, "menuId": "b9298178-8953-4e78-a5ac-a9505568b0b0"},
        {"levelId": 2, "menuId": "1affe5f9-7724-4c12-9db6-50f2a8e4539a"},
        {"levelId": 2, "menuId": "7fc352b7-c350-4112-a150-c5c793c94e0b"},
        {"levelId": 2, "menuId": "0c86d9c1-0c80-46cf-9bac-3ee02d483cd4"},
        {"levelId": 2, "menuId": "09e083e0-6966-4ce0-82f4-b385d5a04d13"},
        {"levelId": 2, "menuId": "65b7eb20-a39f-479a-8a88-416f61c8e505"},
        {"levelId": 2, "menuId": "4baf32bf-5adc-47ca-b3db-5e264e6112b8"},
        {"levelId": 2, "menuId": "a3b24ce9-823d-4e27-b0e9-260afdcf7c19"},
        {"levelId": 2, "menuId": "09044924-a688-47a9-b438-c4c772eb2bd6"},
        {"levelId": 2, "menuId": "fc284ae6-27c3-4e18-ade2-c61d2d9dc3e6"},
        {"levelId": 2, "menuId": "6b28a6cf-bab9-4130-9442-04dc89f831ef"}
      ];
    
    for (const item of menu) {
        await prisma.menuPermission.create({
            data: item,
        });
    }
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