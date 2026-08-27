import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const adminRole = await prisma.role.create({
    data: {
      name: "ADMIN",
      config: { permissions: ["all"] },
    },
  });
  console.log("Seed completed: Created ADMIN role with ID:", adminRole.id);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
