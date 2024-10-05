import { FastifyInstance } from "fastify";
import { MovieModel } from "../schemas/MovieSchema";
import { FastifyRequest } from "fastify/types/request";
import { FastifyReply } from "fastify/types/reply";
import multipart from "@fastify/multipart";

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const moveiRoutes = async (fastify: FastifyInstance) => {
  fastify.register(multipart);

  //get all movies
  fastify.post("/", async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const { genreId } = request.body as { genreId: string };

      let query = {};

      if (genreId) query = { genres: genreId };
      console.log(query);

      const movies = await MovieModel.find(query)
        .populate("reviews")
        .sort({ createtdAt: -1 })
        .limit(5);

      if (movies.length < 1) {
        reply.status(404).send({ error: "The movies not found" });
      } else {
        movies.map(
          (movie) =>
            (movie.averageRating =
              movie.reviews
                .map((review) => review.rating)
                .reduce((acc, curr) => acc + curr, 0) / movie.reviewCount)
        );

        reply.send(movies);
      }
    } catch (error) {
      reply.status(500).send({ error: "Error fetching movies" });
    }
  });

  //get movie by id
  fastify.get("/:id", async (request: FastifyRequest, reply: FastifyReply) => {
    const movieId = request.params.id;

    try {
      const movie = await MovieModel.findById(movieId).populate("reviews");
      if (!movie) return reply.status(404).send({ error: "Movie not found" });

      reply.send(movie);
    } catch (error) {
      reply.status(500).send({ error: "Error fetching movie details" });
    }
  });

  //create movie
  fastify.post(
    "/create",
    {
      preValidation: [fastify.authenticate],
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      const data = await request.file();
      const { fields } = data;
      const file = data.file;
      const fileExtension = path.extname(data.filename);
      const fileName = `${
        data.fields.title.value
      }-${Date.now()}${fileExtension}`;
      const filePath = path.join(__dirname, "../../uploads", fileName);

      try {
        const movie = new MovieModel({
          title: fields.title.value,
          description: fields.description.value,
          director: fields.director.value,
          releaseDate: new Date(fields.releaseDate.value),
          genres: JSON.parse(fields.genres.value),
          cast: JSON.parse(fields.cast.value),
          posterUrl: `/uploads/${fileName}`,
        });

        await new Promise<void>((resolve, reject) => {
          const writeStream = fs.createWriteStream(filePath);
          file.pipe(writeStream);
          file.on("end", () => resolve());
          file.on("error", (err: any) => reject(err));
        });

        await movie.save();
        reply.send({ message: "Movie added successfully", movie });
      } catch (err) {
        reply.status(500).send({ error: "Error adding movie" });
      }
    }
  );
};
