import bcrypt from "bcrypt";
import { env } from "../config/env";
import { PrismaClient } from "../generated/prisma";

export const db = new PrismaClient();

async function main() {
  const adminEmail = env.ADMIN_EMAIL;
  const adminPassword = env.ADMIN_PASSWORD;
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(adminPassword, saltRounds);
  const admin = await db.admin.upsert({
    where: { email: adminEmail },
    update: {
      password: hashedPassword,
    },
    create: {
      email: adminEmail,
      password: hashedPassword,
    },
  });
  console.log(`Admin upsert realizado com sucesso`);
}
main()
  .catch((e) => {
    console.error("Erro ao criar admin:", e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
