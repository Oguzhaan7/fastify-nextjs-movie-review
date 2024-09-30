import { FastifyInstance } from "fastify";
import { ReviewModel } from "../schemas/ReviewSchema";
import { MovieModel } from "../schemas/MovieSchema";
import { FastifyRequest } from "fastify/types/request";
import { FastifyReply } from "fastify/types/reply";

export const reviewRoutes = async (fastify: FastifyInstance) => {
  //create review
  fastify.post(
    "/create",
    {
      preValidation: [fastify.authenticate],
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      const { movieId, rating } = request.body as {
        movieId: string;
        rating: string;
      };
      const userId = request.user._id;

      try {
        const existingReview = await ReviewModel.findOne({ movieId, userId });
        if (existingReview) {
          return reply
            .status(400)
            .send({ error: "You have already reviewed this movie." });
        }

        const review = new ReviewModel({
          movieId,
          userId,
          rating,
        });
        await review.save();

        await MovieModel.findByIdAndUpdate(movieId, {
          $push: { reviews: review._id },
          $inc: { reviewCount: 1 },
        });

        reply.send({ message: "Review added successfly", review });
      } catch (error) {
        reply.status(500).send({ error: "Error adding review" });
      }
    }
  );
};
