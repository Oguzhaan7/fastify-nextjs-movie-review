'use client';

import { Movie } from '@/app/types/movie';
import Image from 'next/image';

interface MovieCardProps {
  movie: Movie;
  onSelect: (movie: Movie) => void;
}

const MovieCard = ({ movie, onSelect }: MovieCardProps) => {
  return (
    <div
      key={movie._id}
      className="flex rounded-lg cursor-pointer z-20 opacity-70 hover:opacity-100 hover:scale-125 transition-all duration-300 ease-in-out"
      onClick={() => onSelect(movie)}
    >
      <div className="max-w-[150px] h-[100px] lg:h-[200px]">
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
