import cors from "@fastify/cors";
import fastify from "fastify";
import { env } from "../config/env";

const app = fastify();

app.register(cors, { origin: "*" });

app.get("/", () => {
  return "Willian online";
});

app.listen({ port: env.PORT }).then(() => console.log("Server is Running!"));
