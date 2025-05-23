import { useEffect, useState } from "react";
import { axiosInstanceURL, Movies } from "../../Services/EndPoints/URLS";
import Header from "../Shared/Header";
import MediaCard from "../Media/MediaCard/MediaCard";
interface Similar {
  original_title?: string;
  poster_path?: string;
  vote_average?: number;
  id: number;
}
export default function TopRated() {
  const [Movie, setMovie] = useState<Similar[]>([]);
  const [show] = useState(true);
  async function getMovies() {
    const response = await axiosInstanceURL.get(Movies.TopRated);
    setMovie(response?.data?.results);
    console.log(response?.data?.results);
  }
  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div className="Top-Rated">
      <div className="my-5 mt-8">
        <Header title="Top Rated Movies" />
      </div>
      <div className="relative flex fixScrollbar  overflow-x-auto space-x-4 p-5">
        {Movie.map((movie) => (
          <MediaCard key={movie.id} media={movie} show={show} />
        ))}
      </div>
    </div>
  );
}
