import { useEffect, useState, useCallback } from "react";
import { axiosInstanceURL, Movies } from "../../Services/EndPoints/URLS";
import Header from "../Shared/Header";
import MediaCard from "../Media/MediaCard/MediaCard";

interface Similar {
  original_title?: string;
  poster_path?: string;
  vote_average?: number;
  id: number;
}

export default function UcomingMovies() {
  const [Movie, setMovie] = useState<Similar[]>([]);
  const [show] = useState(true);

  // Using useCallback to memoize the function
  const getMovies = useCallback(async () => {
    const response = await axiosInstanceURL.get(Movies.Upcoming);
    setMovie(response?.data?.results);
    console.log(response?.data?.results);
  }, []); // Empty dependency array ensures it runs once

  useEffect(() => {
    getMovies();
  }, [getMovies]); // Calls getMovies only when it changes

  return (
    <div className="Top-Rated">
      <div className="my-5 mt-8">
        <Header title="Upcoming Movies" />
      </div>
      <div className="relative fixScrollbar flex overflow-x-auto space-x-4 p-5">
        {Movie.map((movie) => (
          <MediaCard key={movie.id} media={movie} show={show} />
        ))}
      </div>
    </div>
  );
}
