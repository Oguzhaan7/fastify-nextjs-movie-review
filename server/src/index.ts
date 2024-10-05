import Fastify from "fastify";
import dotenv from "dotenv";
import jwtPlugin from "./plugins/jwt";
import staticPlugin from "./plugins/static";
import fastifyCors from "@fastify/cors";

import { userRoutes } from "./routes/user";
import { moveiRoutes } from "./routes/movie";
import { reviewRoutes } from "./routes/review";
import { genreRoutes } from "./routes/genre";

import mongoose from "mongoose";

dotenv.config();

const fastify = Fastify({ logger: true });

mongoose
  .connect(process.env.MONGODB_URI as string)
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log(err));

fastify.register(fastifyCors, {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
});

fastify.register(jwtPlugin);
fastify.register(staticPlugin);

fastify.register(userRoutes, { prefix: "/api/user" });
fastify.register(moveiRoutes, { prefix: "/api/movie" });
fastify.register(reviewRoutes, { prefix: "/api/review" });
fastify.register(genreRoutes, { prefix: "/api/genre" });

const start = async () => {
  try {
    await fastify.listen({
      port: parseInt(process.env.PORT as string, 10) || 5000,
    });
    console.log(`Server is running at http://localhost:${process.env.PORT}`);
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
};

start();
