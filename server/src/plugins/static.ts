import { FastifyInstance, FastifyPluginAsync } from "fastify";
import fastifyStatic from "@fastify/static";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const staticPlugin: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  fastify.register(fastifyStatic, {
    root: path.join(__dirname, "../../uploads"),
    prefix: "/uploads/",
  });
};

export default staticPlugin;
