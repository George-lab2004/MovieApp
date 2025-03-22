import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Loader from "../../Components/Loader/Loader";
import Details from "../../Components/Details/Details";
import {
  Actors,
  axiosInstanceURL,
  Detail,
} from "../../Services/EndPoints/URLS";

// Define types for Movie and Actor details
interface MovieDetails {
  id: number;
  title: string; // Ensure this is always a string
  name?: string;
  overview: string;
  backdrop_path: string;
  poster_path: string;
  tagline: string;
  release_date: string; // Ensure this is always a string
  first_air_date?: string;
  runtime?: number;
  number_of_episodes?: number;
  number_of_seasons?: number;
  genres: { id: number; name: string }[];
  production_companies: {
    id: number;
    name: string;
    logo_path: string | null;
  }[];
  production_countries: { name: string }[];
  original_language: string;
  imdb_id: string;
  budget?: number;
  revenue?: number;
  vote_average: number;
  Reviews: Reviews[];
  show?: boolean;
}

interface Actor {
  id: number;
  name: string;
  profile_path: string | null;
  character: string;
  popularity: number;
}
interface Similar {
  id: number;
  name: string;
  character: string;
  profile_path?: string | null;
  popularity: number;
}
interface AuthorDetails {
  name?: string;
  avatar_path?: string | null;
  rating?: number;
}

interface Reviews {
  author: string;
  author_details: AuthorDetails;
  id: number;
  content: string;
  created_at: string;
  updated_at?: string;
}

export default function MoviesDetailsPage() {
  const { id } = useParams<{ id: string }>(); // Ensure id is a string

  const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null);
  const [actors, setActors] = useState<Actor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null); // Handle errors
  const [Similar, setSimilar] = useState<Similar[]>([]);
  const [Reviews, setReviews] = useState<Reviews[]>([]);
  const [Show] = useState<boolean>(true);
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
        const [movieResponse, actorResponse, similarResponse, ReviewsResponse] =
          await Promise.all([
            axiosInstanceURL.get(Detail.Movie(id)),
            axiosInstanceURL.get(Actors.Movie(id)),
            axiosInstanceURL.get(Detail.MovieSimilar(id)),
            axiosInstanceURL.get(Detail.MoviesReviews(id)),
          ]);

        const movieData = movieResponse.data;
        setSimilar(similarResponse.data.results);
        setReviews(ReviewsResponse.data.results);
        // Ensure required fields are always defined
        setMovieDetails({
          ...movieData,
          title: movieData.title || movieData.name || "Untitled",
          release_date:
            movieData.release_date || movieData.first_air_date || "Unknown",
        } as MovieDetails);

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

  return (
    <Details
      item={movieDetails}
      actors={actors}
      similar={Similar}
      Reviews={Reviews}
      show={Show}
    />
  );
}
