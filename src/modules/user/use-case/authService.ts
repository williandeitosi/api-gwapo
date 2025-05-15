import jwt from "jsonwebtoken";
import { env } from "../../../../config/env";
import { db } from "../../../../prisma/db";
interface TokenPayload {
  id: number;
  email: string;
}
export class AuthService {
  constructor(
    private accessTokenSecret = env.JWT_ACCESS_SECRET,
    private refreshTokenSecret = env.JWT_REFRESH_SECRET
  ) {}

  generateTokens(payload: TokenPayload) {
    const accessToken = jwt.sign(payload, this.accessTokenSecret, {
      expiresIn: "15m",
    });

    const refreshToken = jwt.sign(payload, this.refreshTokenSecret, {
      expiresIn: "7d",
    });

    return { accessToken, refreshToken };
  }

  async saveTokens(adminId: number, refreshToken: string) {
    await db.adminToken.upsert({
      where: { adminId },
      update: { refreshToken },
      create: {
        adminId,
        refreshToken,
      },
    });
  }

  verifyAccessToken(token: string) {
    try {
      return jwt.verify(token, this.accessTokenSecret);
    } catch (error) {
      return null;
    }
  }

  async refreshAccessToken(adminId: number, providedRefreshToken: string) {
    const admin = await db.adminToken.findUnique({
      where: { adminId },
    });

    if (!admin || admin.refreshToken !== providedRefreshToken) {
      return null;
    }

    try {
      const payload = jwt.verify(
        providedRefreshToken,
        this.refreshTokenSecret
      ) as TokenPayload;

      const newAccessToken = jwt.sign(payload, this.accessTokenSecret, {
        expiresIn: "15m",
      });

      return newAccessToken;
    } catch (err) {
      return null;
    }
  }
}
