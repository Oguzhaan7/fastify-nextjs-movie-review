'use client';

import { useEffect, useState } from 'react';
import { Movie } from '@/app/types/movie';
import Carousel from '@/app/components/carousel';
import MovieCard from '@/app/components/movie-card';

const MovieList = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/movie', {
          next: {
            revalidate: 10,
          },
        });
        const data = await response.json();
        setMovies(data);
        if (data.length > 0) {
          setSelectedMovie(data[0]);
        }
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="flex flex-col w-full items-center justify-between">
      <Carousel movie={selectedMovie} />

      <div className="flex gap-12 fixed z-10 bottom-20">
        {movies.map((movie) => (
          <MovieCard
            key={movie._id}
            movie={movie}
            onSelect={setSelectedMovie}
          />
        ))}
      </div>
    </div>
  );
};

export default MovieList;
