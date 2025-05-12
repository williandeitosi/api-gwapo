import cors from "@fastify/cors";
import fastify, { type FastifyInstance } from "fastify";
import { env } from "../config/env";
import { setupRoutes } from "./routes";

const app: FastifyInstance = fastify();

app.register(cors, { origin: "*" });
app.register(setupRoutes, { prefix: "/api" });

app.listen({ port: env.PORT }).then(() => console.log("Server is Running!"));
