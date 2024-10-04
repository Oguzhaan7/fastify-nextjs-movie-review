import { Schema, model } from "mongoose";

const MovieSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  releaseDate: {
    type: Date,
    required: true,
  },
  genres: {
    type: Schema.Types.ObjectId,
    ref: "Genre",
  },
  cast: {
    type: [String],
  },
  posterUrl: {
    type: String,
  },
  averageRating: {
    type: Number,
    default: 0,
  },
  reviewCount: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export const MovieModel = model("Movie", MovieSchema);
