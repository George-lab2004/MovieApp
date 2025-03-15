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

  // Correct useCallback for fetching movies
  const getMovies = useCallback(() => {
    return axiosInstanceURL.get(Movies.Trending);
  }, []);

  // Correct useCallback for fetching series
  const getSeries = useCallback(() => {
    return axiosInstanceURL.get(Series.Trending);
  }, []);

  // Toggle between movies and series
  const toggleContent = useCallback(() => {
    setIsShowingMovies((prev) => !prev);
  }, []);

  return (
    <div className="-z-50">
      <AnimatedText text="Dive into World of Movies" />

      <Header title="Trending Movies" />
      <Hero
        fetchData={isShowingMovies ? getMovies : getSeries} // Memoized functions
        buttonText={
          isShowingMovies ? "See Popular Series" : "See Popular Movies"
        }
        onButtonClick={toggleContent} // Memoized function
      />
    </div>
  );
}
