import { db } from "../../../../prisma/db";
import type { TAdmin } from "../schema";

export class AdminService {
  async login({ email, password }: TAdmin) {
    console.log({ email, password });

    const loginAdmin = await db.admin.findUnique({
      where: { email },
    });
  }
}
