'use client';
import { useEffect, useState } from 'react';
import { Movie } from '../types/movie';
import Image from 'next/image';

interface CarouselProps {
  movie: Movie | null;
}

const Carousel = ({ movie }: CarouselProps) => {
  const [displayedMovie, setDisplayedMovie] = useState<Movie | null>(null);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    if (movie) {
      setFade(true);
      setTimeout(() => {
        setDisplayedMovie(movie);
        setFade(false);
      }, 500);
    }
  }, [movie]);

  if (!displayedMovie) return null;

  return (
    <div className="">
      <h3
        className={`text-left transition-all ease-in-out duration-500 ${
          fade ? 'opacity-0' : 'opacity-100'
        }`}
      >
        {displayedMovie.title}
      </h3>
      <p
        className={`text-left transition-all ease-in-out duration-500 ${
          fade ? 'opacity-0' : 'opacity-100'
        }`}
      >
        {displayedMovie.description}
      </p>
      <Image
        src={`http://localhost:5000${displayedMovie.posterUrl}`}
        alt={`${displayedMovie.title} poster`}
        fill
        className={`-z-10 absolute transition-all ease-in-out duration-500 ${
          fade ? 'opacity-0' : 'opacity-100'
        }`}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-100 z-10"></div>
    </div>
  );
};

export default Carousel;
