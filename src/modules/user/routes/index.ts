import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { AdminController } from "../controller";
import { AdminService } from "../use-case";

const service = new AdminService();
const controller = new AdminController(service);

export async function adminRoutes(app: FastifyInstance) {
  app.post("/login", (reques: FastifyRequest, reply: FastifyReply) => {
    controller.login(reques, reply);
  });
}
