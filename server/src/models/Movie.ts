import { Review } from "./Review";

export interface Movie {
  _id: string;
  title: string;
  description: string;
  director: string;
  releaseDate: Date;
  genres: string[];
  cast: string[];
  posterUrl: string;
  averageRating?: number;
  reviewCount?: number;
  reviews: [Review];
  createdAt: Date;
  updatedAt: Date;
}
