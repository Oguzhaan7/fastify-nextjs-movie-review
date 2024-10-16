import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { GenreModel } from "../schemas/GenreSchema";

export const genreRoutes = async (fastify: FastifyInstance) => {
  fastify.post(
    "/create",
    {
      preValidation: [fastify.authenticate],
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      const { name, description } = request.body as {
        name: string;
        description: string;
      };
      try {
        const existingGenre = await GenreModel.findOne({ name: name });
        if (existingGenre)
          return reply
            .status(400)
            .send({ error: "This genre has already been added" });

        const genre = new GenreModel({
          name,
          description,
        });
        await genre.save();

        reply.send({ message: "Genre added successfly" });
      } catch (error) {
        reply.status(500).send({ error: "Error adding genre" });
      }
    }
  );

  fastify.get(
    "/getAll",
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const genres = await GenreModel.find().sort({ name: 1 });
        reply.send(genres);
      } catch (error) {
        reply.status(500).send({ error: "Error fetching genres" });
      }
    }
  );
};
