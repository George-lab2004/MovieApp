import { useCallback, useState } from "react";
import Hero from "../../Components/Shared/Hero";
import {
  axiosInstanceURL,
  Movies,
  Series,
} from "../../../Services/EndPoints/URLS";
import AnimatedText from "../../Components/Shared/AnimatedText";
import Header from "../../Components/Shared/Header";
import "./Home.css";

export default function Home() {
  const [isShowingMovies, setIsShowingMovies] = useState(true);

  // Memoized API calls
  const getMovies = useCallback(
    () => axiosInstanceURL.get(Movies.Trending),
    []
  );
  const getSeries = useCallback(
    () => axiosInstanceURL.get(Series.Trending),
    []
  );

  // Automatically fetch movie details when MovieId updates

  // Handle movie selection

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
      />
    </div>
  );
}
