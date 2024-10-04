'use client';

import { useEffect, useState } from 'react';
import { Movie } from '@/app/types/movie';
import Carousel from '@/app/components/movie/Carousel';
import MovieCard from './MovieCard';

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
    <div className="flex flex-col w-full h-[80vh] items-center justify-evenly xl:justify-between">
      <div className="2xl:mt-24 3xl:mt-44">
        <Carousel movie={selectedMovie} />
      </div>

      <div className="flex gap-2 z-10">
        {movies.map((movie) => (
          <MovieCard
            key={movie._id}
            movie={movie}
            selectedId={selectedMovie && selectedMovie._id}
            onSelect={setSelectedMovie}
          />
        ))}
      </div>
    </div>
  );
};

export default MovieList;
