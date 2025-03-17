import { useState } from "react";
import AnimatedText from "../Shared/AnimatedText";
import "../../Pages/Home/Home.css";
interface Genre {
  id: number;
  name: string;
}

interface ProductionCompany {
  id: number;
  name: string;
  logo_path: string | null;
}

interface Country {
  name: string;
}

interface Actor {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
  popularity: number;
}

interface MovieItem {
  name: string | null;
  title: string | null;
  tagline: string;
  release_date: string;
  runtime: number;
  overview: string;
  poster_path: string;
  genres: Genre[];
  production_companies: ProductionCompany[];
  production_countries: Country[];
  original_language: string;
  imdb_id: string;
  budget: number;
  revenue: number;
  vote_average: number;
  first_air_date: string;
  number_of_episodes: number;
  number_of_seasons: number;
}

interface DetailsProps {
  item: MovieItem;
  actors: Actor[];
}

export default function Details({ item, actors }: DetailsProps) {
  const [showAllActors, setShowAllActors] = useState(false);

  // Limit to top 8 actors unless "Show More" is clicked
  const visibleActors = showAllActors ? actors : actors.slice(0, 8);
  return (
    <div className="min-h-screen p-8 transition-colors bg-gradient-to-b from-gray-100 to-gray-300 text-gray-800 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 dark:text-gray-200">
      {/* Movie Container */}
      <div className="max-w-5xl mx-auto p-6 rounded-xl shadow-xl bg-gray-100 bg-opacity-90 border border-gray-200 dark:bg-gray-800 dark:bg-opacity-80 dark:border-gray-700">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center space-x-6 mb-8">
          <img
            src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
            alt={item.title || item.name || "No title available"}
            className="w-48 h-auto rounded-xl shadow-lg"
          />
          <div>
            <h1 className="text-4xl font-extrabold text-[#4a90e2] dark:text-yellow-400">
              {item.name || item.title}
            </h1>
            <p className="text-sm italic text-gray-600 dark:text-gray-300">
              <AnimatedText text={item.tagline} />
            </p>
            <p className="text-sm mt-2 text-gray-500">
              {item.release_date && item.runtime
                ? `${item.release_date} • ${item.runtime} min`
                : item.first_air_date &&
                  item.number_of_episodes &&
                  item.number_of_seasons
                ? `Seasons: ${item.number_of_seasons} • Episodes: ${item.number_of_episodes}`
                : ""}
            </p>
          </div>
        </div>

        {/* Overview Section */}
        <div className="my-6">
          <h2 className="text-2xl font-semibold text-[#4a90e2] dark:text-yellow-400">
            Overview
          </h2>
          <p className="mt-2 leading-relaxed text-gray-700 dark:text-gray-300">
            {item.overview}
          </p>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          <div>
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
              Genres
            </h3>
            <ul className="mt-2 text-gray-600 dark:text-gray-400">
              {item.genres.map((genre) => (
                <li key={genre.id} className="py-1">
                  {genre.name}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
              Production
            </h3>
            <ul className="mt-2 text-gray-600 dark:text-gray-400">
              {item.production_companies.map((company) => (
                <li key={company.id} className="flex items-center space-x-2">
                  {company.logo_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/original${company.logo_path}`}
                      alt={company.name}
                      className="w-16 h-auto my-2 rounded"
                    />
                  ) : (
                    <span>{company.name}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
              Details
            </h3>
            <ul className="mt-2 text-gray-600 dark:text-gray-400">
              <li>
                <strong>Language:</strong> {item.original_language}
              </li>
              <li>
                <strong>Country:</strong>{" "}
                {item.production_countries.map((c) => c.name).join(", ")}
              </li>
              <li>
                <strong>IMDB:</strong>
                <a
                  href={`https://www.imdb.com/title/${item.imdb_id}`}
                  className="hover:underline text-[#4a90e2] dark:text-yellow-400 ml-1"
                >
                  Link
                </a>
              </li>
              <li>
                <strong>Budget:</strong> $
                {item.budget ? `${Math.floor(item.budget / 1_000_000)}M` : "0M"}
              </li>
              <li>
                <strong>Revenue:</strong> $
                {item.revenue
                  ? `${Math.floor(item.revenue / 1_000_000)}M`
                  : "0M"}
              </li>
            </ul>
          </div>
        </div>

        {/* Ratings */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300">
            Ratings
          </h2>
          <div className="flex items-center mt-2">
            <span className="text-3xl font-bold text-[#4a90e2] dark:text-yellow-400">
              {item.vote_average.toFixed(1)}
            </span>
          </div>
        </div>
      </div>

      {/* Cast Section */}
      <div className="my-8">
        <h2 className="text-2xl font-semibold text-[#4a90e2] dark:text-yellow-400">
          Cast
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
          {visibleActors.map((actor) => (
            <div
              key={actor.id}
              className="flex flex-col items-center bg-white dark:bg-gray-800 dark:bg-opacity-80 p-4 rounded-xl shadow-lg"
            >
              {/* Actor Image */}
              <img
                src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                alt={actor.name}
                className="w-24 h-24 object-cover rounded-full shadow-lg mb-2"
              />
              {/* Actor Name */}
              <h3 className="text-lg font-semibold text-[#4a90e2] dark:text-yellow-400 text-center">
                {actor.name}
              </h3>
              {/* Actor Role */}
              <p className="text-gray-600 dark:text-gray-300 text-sm italic text-center">
                {actor.character}
              </p>
              {/* Additional Detail */}
              <p className="text-gray-500 dark:text-gray-400 text-xs text-center mt-1">
                Popularity: {actor.popularity.toFixed(1)}
              </p>
            </div>
          ))}
        </div>

        {/* Show More Button */}
        {actors.length > 8 && (
          <div className="mt-6 text-center">
            <button
              onClick={() => setShowAllActors(!showAllActors)}
              className="px-4 py-2 bg-[#4a90e2] dark:bg-yellow-400 text-white dark:text-gray-900 rounded-lg shadow-md hover:bg-[#357abd] dark:hover:bg-yellow-300 transition cursor-pointer"
            >
              {showAllActors ? "Show Less" : "Show More"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
