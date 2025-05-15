import type { FastifyReply, FastifyRequest } from "fastify";
import { adminSchema } from "../schema";
import type { AdminService } from "../use-case/adminService";

export class AdminController {
  constructor(private service: AdminService) {}

  async login(reques: FastifyRequest, reply: FastifyReply) {
    try {
      const result = adminSchema.safeParse(reques.body);
      if (!result.success) {
        return reply.code(400).send({ errors: result.error.format() });
      }
      const data = result.data;
      const { email, password } = data;

      const loginResult = await this.service.login({ email, password });

      if (!loginResult.success) {
        return reply.code(401).send({
          success: false,
          message: loginResult.message,
        });
      }

      return reply.code(200).send({
        success: true,
        message: loginResult.message,
        accessToken: loginResult.access_token,
        refreshToken: loginResult.refresh_token,
      });
    } catch (error) {
      console.error("Login error:", error);
      return reply.code(500).send({
        success: false,
        message: "Internal server error",
      });
    }
  }
}
