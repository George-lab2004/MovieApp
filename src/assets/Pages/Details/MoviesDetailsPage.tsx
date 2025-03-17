import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Loader from "../../Components/Loader/Loader";
import {
  Actors,
  axiosInstanceURL,
  Detail,
} from "../../../Services/EndPoints/URLS";
import Details from "../../Components/Details/Details";

// Define types for Movie and Actor details
interface MovieDetails {
  id: number;
  title?: string; // Optional, because TV shows use `name`
  name: string; // Ensure name is always a string
  overview: string;
  backdrop_path: string;
  poster_path: string;
  tagline: string;
  release_date?: string; // Optional, because TV shows use `first_air_date`
  first_air_date?: string; // Optional, because movies use `release_date`
  runtime?: number; // Optional, since TV shows don't have runtime
  number_of_episodes?: number; // For TV shows
  number_of_seasons?: number; // For TV shows
  genres: { id: number; name: string }[];
  production_companies: {
    id: number;
    name: string;
    logo_path: string | null;
  }[];
  production_countries: { name: string }[];
  original_language: string;
  imdb_id: string;
  budget?: number; // Optional, since TV shows don't have a budget
  revenue?: number; // Optional, since TV shows don't have revenue
  vote_average: number;
}

interface Actor {
  id: number;
  name: string;
  profile_path: string | null;
  character: string;
  popularity: number;
}

export default function MoviesDetailsPage() {
  const { id } = useParams<{ id: string }>(); // Ensure id is a string

  const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null);
  const [actors, setActors] = useState<Actor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null); // Handle errors

  useEffect(() => {
    if (!id) {
      setError("Invalid movie ID.");
      setLoading(false);
      return;
    }

    const fetchMovieData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [movieResponse, actorResponse] = await Promise.all([
          axiosInstanceURL.get(Detail.Movie(id)),
          axiosInstanceURL.get(Actors.Movie(id)),
        ]);

        setMovieDetails(movieResponse.data);
        setActors(actorResponse.data.cast || []);
      } catch (error) {
        console.error("Error fetching movie details:", error);
        setError("Failed to load movie details.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovieData();
  }, [id]);

  if (loading) return <Loader />;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!movieDetails)
    return <p className="text-center text-red-500">Movie not found.</p>;

  return <Details item={movieDetails} actors={actors} />;
}
