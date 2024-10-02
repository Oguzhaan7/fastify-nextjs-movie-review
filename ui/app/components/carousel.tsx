'use client';
import { useEffect, useState } from 'react';
import { Movie } from '../types/movie';
import Image from 'next/image';
import { AiFillStar } from 'react-icons/ai';

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
    <div className="flex flex-col gap-4 w-full px-24">
      <h3
        className={`text-left transition-all ease-[cubic-bezier(.18,-0.47,.04,1.48)] duration-700 text-2xl xl:text-6xl font-bold text-amber-400 ${
          fade ? 'translate-y-16 opacity-0' : 'translate-y-0 opacity-100'
        }`}
      >
        {displayedMovie.title}
      </h3>
      <p
        className={`text-left transition-all ease-[cubic-bezier(.18,-0.47,.04,1.48)] duration-700 text-white text-sm xl:text-lg w-full lg:max-w-[50%] ${
          fade ? 'translate-y-16 opacity-0' : 'translate-y-0 opacity-100'
        }`}
      >
        {displayedMovie.description}
      </p>
      <div
        className={`flex gap-12 text-left transition-all z-20 ease-[cubic-bezier(.18,-0.47,.04,1.48)] duration-700  ${
          fade ? 'translate-y-16 opacity-0' : 'translate-y-0 opacity-100'
        }`}
      >
        <button
          onClick={() => alert(1)}
          className="px-8 py-3 border-2 border-amber-300 text-slate-200 opacity-90 rounded-lg text-xl hover:text-white hover:border-amber-500 "
        >
          Leave a Review
        </button>
        <div className="flex gap-2 items-center text-zinc-400">
          <AiFillStar className="text-2xl" />
          <span className="text-lg">4.3 Rating</span>
        </div>
      </div>
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
