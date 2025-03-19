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
import TopRated from "../../Components/TopRated/TopRatedMovies";
import UpcomingMovies from "../../Components/Upcoming/UpcomingMovies";
import TopRatedSeries from "../../Components/TopRated/TopRatedSeries";

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

  const toggleContent = useCallback(() => {
    setIsShowingMovies((prev) => !prev);
  }, []);

  return (
    <div className="-z-50">
      <AnimatedText text="Dive into World of Movies" />
      <div className="my-5">
        {" "}
        <Header title="Trending Movies" />
      </div>
      <Hero
        fetchData={isShowingMovies ? getMovies : getSeries}
        buttonText={
          isShowingMovies ? "See Popular Series" : "See Popular Movies"
        }
        isshowingMovies={isShowingMovies}
        onButtonClick={toggleContent}
      />
      <TopRated />
      <UpcomingMovies />
      <TopRatedSeries />
    </div>
  );
}
