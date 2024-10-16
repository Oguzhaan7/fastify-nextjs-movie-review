'use client';
import { useEffect, useState } from 'react';

const GenreDropdown = () => {
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/genre/getAll', {
          method: 'get',
        });
        setGenres(await response.json());
      } catch (error) {
        console.log(error);
      }
    };

    fetchGenres();
  }, []);

  return <div></div>;
};

export default GenreDropdown;
