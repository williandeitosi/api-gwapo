import type { FastifyInstance } from "fastify";
import { adminRoutes } from "./modules/user/routes";

export async function setupRoutes(app: FastifyInstance) {
  app.register(adminRoutes, { prefix: "/admin" });
}
