import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { AdminController } from "../controller";
import { AdminService } from "../use-case/adminService";
import { AuthService } from "../use-case/authService";

const auth = new AuthService();
const service = new AdminService(auth);
const controller = new AdminController(service);

export async function adminRoutes(app: FastifyInstance) {
  app.post("/login", (reques: FastifyRequest, reply: FastifyReply) => {
    controller.login(reques, reply);
  });
}
