import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Loader from "../../Components/Loader/Loader";
import {
  Actors,
  axiosInstanceURL,
  Detail,
} from "../../../Services/EndPoints/URLS";
import Details from "../../Components/Details/Details";

// Define types for Series and Actor details
interface SeriesDetails {
  id: number;
  name: string;
  title?: string; // Optional for series
  overview: string;
  backdrop_path: string;
  poster_path: string;
  tagline: string;
  first_air_date: string;
  release_date?: string; // Optional for series
  runtime?: number;
  number_of_episodes: number;
  number_of_seasons: number;
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
}

interface Actor {
  id: number;
  name: string;
  profile_path: string | null;
  character: string;
  popularity: number;
}

export default function SeriesDetailsPage() {
  const { id } = useParams<{ id: string }>(); // Ensure id is a string

  const [seriesDetails, setSeriesDetails] = useState<SeriesDetails | null>(
    null
  );
  const [actors, setActors] = useState<Actor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null); // Handle errors

  useEffect(() => {
    if (!id) {
      setError("Invalid series ID.");
      setLoading(false);
      return;
    }

    const fetchSeriesData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [seriesResponse, actorResponse] = await Promise.all([
          axiosInstanceURL.get(Detail.Series(id)),
          axiosInstanceURL.get(Actors.Series(id)),
        ]);

        const seriesData = seriesResponse.data;

        // Ensure required fields are always defined
        setSeriesDetails({
          ...seriesData,
          release_date:
            seriesData.release_date || seriesData.first_air_date || "Unknown",
        } as SeriesDetails);

        setActors(actorResponse.data.cast || []);
      } catch (error) {
        console.error("Error fetching series details:", error);
        setError("Failed to load series details.");
      } finally {
        setLoading(false);
      }
    };

    fetchSeriesData();
  }, [id]);

  if (loading) return <Loader />;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!seriesDetails)
    return <p className="text-center text-red-500">Series not found.</p>;

  return <Details item={seriesDetails} actors={actors} />;
}
