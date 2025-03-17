import { useCallback, useEffect, useState } from "react";
import Hero from "../../Components/Shared/Hero";
import {
  axiosInstanceURL,
  Detail,
  Movies,
  Series,
} from "../../../Services/EndPoints/URLS";
import AnimatedText from "../../Components/Shared/AnimatedText";
import Header from "../../Components/Shared/Header";
import "./Home.css";
import Details from "../../Components/Details/Details";

export default function Home() {
  const [isShowingMovies, setIsShowingMovies] = useState(true);
  const [MovieId, setMovieId] = useState(null);
  const [MovieDetails, setMovieDetails] = useState(null);

  // Memoized API calls
  const getMovies = useCallback(
    () => axiosInstanceURL.get(Movies.Trending),
    []
  );
  const getSeries = useCallback(
    () => axiosInstanceURL.get(Series.Trending),
    []
  );

  const getMoviesDetails = async () => {
    if (!MovieId) return;

    try {
      const response = await axiosInstanceURL.get(Detail.Movie(MovieId));
      setMovieDetails(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching movie details:", error);
    }
  };

  // Automatically fetch movie details when MovieId updates
  useEffect(() => {
    if (MovieId) {
      getMoviesDetails();
    }
  }, [MovieId]);

  // Handle movie selection
  const handleId = (id) => {
    console.log("Selected Movie ID:", id);
    setMovieId(id);
  };

  // Toggle between movies and series
  const toggleContent = useCallback(() => {
    setIsShowingMovies((prev) => !prev);
  }, []);

  return (
    <div className="-z-50">
      <AnimatedText text="Dive into World of Movies" />

      <Header title="Trending Movies" />
      <Hero
        fetchData={isShowingMovies ? getMovies : getSeries}
        buttonText={
          isShowingMovies ? "See Popular Series" : "See Popular Movies"
        }
        isshowingMovies={isShowingMovies}
        onButtonClick={toggleContent}
        getID={handleId}
      />

      {MovieDetails && <Details item={MovieDetails} actors={[]} />}
    </div>
  );
}
