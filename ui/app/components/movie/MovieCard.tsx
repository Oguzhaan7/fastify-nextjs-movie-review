'use client';

import { Movie } from '@/app/types/movie';
import Image from 'next/image';
import styles from './MovieCard.module.css';

interface MovieCardProps {
  movie: Movie;
  onSelect: (movie: Movie) => void;
  selectedId: string | null;
}

const MovieCard = ({ movie, onSelect, selectedId }: MovieCardProps) => {
  return (
    <div
      key={movie._id}
      className="flex rounded-lg cursor-pointer z-20"
      onClick={() => onSelect(movie)}
    >
      <div
        className={`${styles.moviecard} ${
          selectedId === movie._id
            ? 'brightness-100 -translate-y-2'
            : 'brightness-50'
        } h-[100px] lg:h-[150px] xl:h-[200px] transition-all duration-400 ease-in-out hover:brightness-100`}
      >
        <Image
          quality={100}
          height={200}
          width={150}
          src={`http://localhost:5000${movie.posterUrl}`}
          alt={`${movie.title} poster`}
          className="w-full h-full object-center object-cover rounded-md shadow-sm"
        />
      </div>
    </div>
  );
};

export default MovieCard;
