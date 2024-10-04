export interface Movie {
  _id: string;
  title: string;
  description: string;
  director: string;
  releaseDate: string;
  genres: string[];
  cast: string[];
  posterUrl: string;
  reviews: string[];
  averageRating?: number;
  reviewCount?: number;
}
