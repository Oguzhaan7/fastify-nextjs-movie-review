import MovieList from '@/app/components/movie/MovieList';

const Home = async () => {
  return (
    <div className="container mx-auto px-4">
      <MovieList />
    </div>
  );
};

export default Home;
