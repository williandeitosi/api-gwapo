import bcrypt from "bcrypt";
import { db } from "../../../../prisma/db";
import type { TAdmin } from "../schema";
import type { AuthService } from "./authService";

export class AdminService {
  constructor(private authService: AuthService) {}
  async login({ email, password }: TAdmin) {
    const admin = await db.admin.findUnique({
      where: { email },
    });

    if (!admin) {
      return {
        success: false,
        message: "Invalid email or password",
      };
    }

    const passwordMatch = await bcrypt.compare(password, admin.password);
    if (!passwordMatch) {
      return {
        success: false,
        message: "Invalid email or password",
      };
    }

    const token = this.authService.generateTokens({
      id: Number(admin.id),
      email: admin.email,
    });

    await this.authService.saveTokens(admin.id, token.refreshToken);

    return {
      success: true,
      message: "Login successful",
      access_token: token.accessToken,
      refresh_token: token.refreshToken,
    };
  }
}
