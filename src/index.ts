import cors from "@fastify/cors";
import fastify from "fastify";
import { router } from "./router";

const server = fastify({
  // Logger only for production
  logger: !!(process.env.NODE_ENV !== "development"),
});

// Register the database plugin

// server.register(firebase, firebaseConfig);

// Register the cors plugin
await server.register(cors);

// Middleware: Router
await server.register(router);

const FASTIFY_PORT = Number(process.env.PORT) || 3001;

const start = async () => {
  try {
    await server.listen({ port: FASTIFY_PORT, host: "0.0.0.0" });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();

console.log(`Fastify server running on port ${FASTIFY_PORT}`);
console.log(`Route index: /`);
console.log(`Route user: /api/v1/user`);
