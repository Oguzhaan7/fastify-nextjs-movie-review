import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

export const moviewRoutes = async (fastify: FastifyInstance) => {
  fastify.post(
    "/create",
    {
      preValidation: [fastify.authorize],
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      const { genre } = request.body as { genre: string };
      try {
      } catch (error) {}
    }
  );
};
