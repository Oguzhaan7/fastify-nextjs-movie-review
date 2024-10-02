'use client';

import { Movie } from '@/app/types/movie';
import Image from 'next/image';
import styles from './MovieCard.module.css';
import { useEffect, useState } from 'react';

interface MovieCardProps {
  movie: Movie;
  onSelect: (movie: Movie) => void;
}

const MovieCard = ({ movie, onSelect }: MovieCardProps) => {
  const [selectedMovie, setSelectedMovie] = useState<Movie>();

  const handleOnClick = () => {
    onSelect(movie);
    setSelectedMovie(movie);
  };

  useEffect(() => {
    console.log(selectedMovie);
  }, [selectedMovie]);
  return (
    <div
      key={movie._id}
      className="flex rounded-lg cursor-pointer z-20"
      onClick={handleOnClick}
    >
      <div
        className={`${styles.moviecard} ${
          selectedMovie && selectedMovie._id === movie._id
            ? 'brightness-100'
            : 'brightness-50'
        } h-[100px] lg:h-[150px] xl:h-[200px] brightness-50 hover:brightness-100 transition-all duration-200 ease-in-out`}
      >
        <Image
          quality={100}
          height={200}
          width={150}
          src={`http://localhost:5000${movie.posterUrl}`}
          alt={`${movie.title} poster`}
          className="w-full h-full object-center object-cover rounded-md shadow-sm "
        />
      </div>
    </div>
  );
};

export default MovieCard;
