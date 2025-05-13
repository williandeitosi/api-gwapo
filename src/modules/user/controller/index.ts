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

      await this.service.login({ email, password });

      return reply.code(200).send({ message: "Login successfully!" });
    } catch (error) {
      console.log(error);
    }
  }
}
