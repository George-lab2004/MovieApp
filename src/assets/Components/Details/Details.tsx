import { useState } from "react";
import AnimatedText from "../Shared/AnimatedText";
import "../../Pages/Home/Home.css";
import { Link } from "react-router-dom";
import Header from "../Shared/Header";
interface Genre {
  id: number;
  name: string;
}

interface ProductionCompany {
  id: number;
  name: string;
  logo_path?: string | null;
}

interface Country {
  name: string;
}

interface Actor {
  id: number;
  name: string;
  character: string;
  profile_path?: string | null;
  popularity: number;
}

interface Similar {
  original_title?: string;
  poster_path?: string;
  vote_average?: number;
  id: number;
}
interface MovieItem {
  name?: string | null;
  title?: string | null;
  tagline?: string;
  release_date?: string;
  runtime?: number;
  overview?: string;
  poster_path?: string;
  genres: Genre[];
  production_companies: ProductionCompany[];
  production_countries: Country[];
  original_language?: string;
  imdb_id?: string;
  budget?: number;
  revenue?: number;
  vote_average?: number;
  first_air_date?: string;
  number_of_episodes?: number;
  number_of_seasons?: number;
  Reviews: Reviews[];
}

interface DetailsProps {
  item: MovieItem;
  actors: Actor[];
  similar: Similar[];
  Reviews: Reviews[];
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
export default function Details({
  item,
  actors,
  similar,
  Reviews,
}: DetailsProps) {
  const [showAllActors, setShowAllActors] = useState(false);

  // Limit to top 8 actors unless "Show More" is clicked
  const visibleActors = showAllActors ? actors : actors.slice(0, 8);
  const visibleSimilar = similar.slice(0, 8);
  const visibleReviews = Reviews.slice(0, 9);

  return (
    <div className="min-h-screen p-8 transition-colors bg-gradient-to-b from-gray-100 to-gray-300 text-gray-800 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 dark:text-gray-200">
      {/* Movie Container */}
      <div className="max-w-5xl mx-auto p-6 rounded-xl shadow-xl bg-gray-100 bg-opacity-90 border border-gray-200 dark:bg-gray-800 dark:bg-opacity-80 dark:border-gray-700">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center space-x-6 mb-8">
          {item.poster_path && (
            <img
              src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
              alt={item.title ?? item.name ?? "No title available"}
              className="w-48 h-auto rounded-xl shadow-lg"
            />
          )}
          <div>
            <h1 className="text-4xl font-extrabold text-[#4a90e2] dark:text-yellow-400">
              {item.name ?? item.title ?? "No title available"}
            </h1>
            {item.tagline && (
              <p className="text-sm italic text-gray-600 dark:text-gray-300">
                <AnimatedText text={item.tagline} />
              </p>
            )}
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
        {item.overview && (
          <div className="my-6">
            <h2 className="text-2xl font-semibold text-[#4a90e2] dark:text-yellow-400">
              Overview
            </h2>
            <p className="mt-2 leading-relaxed text-gray-700 dark:text-gray-300">
              {item.overview}
            </p>
          </div>
        )}

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
              {item.original_language && (
                <li>
                  <strong>Language:</strong> {item.original_language}
                </li>
              )}
              {item.production_countries.length > 0 && (
                <li>
                  <strong>Country:</strong>{" "}
                  {item.production_countries.map((c) => c.name).join(", ")}
                </li>
              )}
              {item.imdb_id && (
                <li>
                  <strong>IMDB:</strong>
                  <a
                    href={`https://www.imdb.com/title/${item.imdb_id}`}
                    className="hover:underline text-[#4a90e2] dark:text-yellow-400 ml-1"
                  >
                    Link
                  </a>
                </li>
              )}
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
        {item.vote_average !== undefined && (
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
        )}
      </div>
      {/* Cast Section */}
      <div className="my-8">
        <Header title="Cast " />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
          {visibleActors.map((actor) => (
            <div
              key={actor.id}
              className="flex flex-col items-center bg-white dark:bg-gray-800 dark:bg-opacity-80 p-4 rounded-xl shadow-lg"
            >
              {actor.profile_path && (
                <img
                  src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                  alt={actor.name}
                  className="w-24 h-24 object-cover rounded-full shadow-lg mb-2"
                />
              )}
              <h3 className="text-lg font-semibold text-[#4a90e2] dark:text-yellow-400 text-center">
                {actor.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm italic text-center">
                {actor.character}
              </p>
            </div>
          ))}
        </div>

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
      <Header title="Similar Shows" />
      <section className="mt-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {visibleSimilar.map((movie) => (
            <div
              key={movie.id}
              className="min-w-[250px] max-w-xs w-full bg-gray-100 dark:bg-zinc-900 border border-gray-300 dark:border-gray-700 rounded-lg shadow h-[500px] flex-shrink-0 mx-2 mb-4"
            >
              <img
                className="rounded-t-lg h-64 w-full object-cover"
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.original_title}
              />
              <span className="absolute ps-14 pt-5 flex w-72">
                <span className="text-blue-700 dark:text-blue-300">
                  Rating :
                </span>{" "}
                ⭐ {movie.vote_average}
              </span>
              <div className="p-5 pt-16 text-gray-900 dark:text-white text-center">
                <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-800 dark:text-white">
                  {movie.original_title}
                </h5>
                <div className="flex flex-col">
                  <Link to={`/MoviesDetailsPage/${movie.id}`}>
                    <button
                      className="inline-flex w-full px-3 py-2 text-sm font-medium text-center text-white bg-blue-600 dark:bg-blue-700 rounded-xl hover:bg-blue-800 dark:hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 justify-center cursor-pointer dark:hover:text-yellow-300 dark:font-semibold items-center mb-5"
                      onClick={() => console.log(`Movie ID: ${movie.id}`)}
                    >
                      Read more
                      <svg
                        className="w-3.5 h-3.5 ms-2"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 10"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M1 5h12m0 0L9 1m4 4L9 9"
                        />
                      </svg>
                    </button>
                  </Link>

                  <button className="inline-flex w-full px-3 py-2 text-sm text-blue-600 dark:text-blue-400 font-medium text-center bg-gray-200 dark:bg-gray-800 rounded-xl focus:ring-4 hover:text-yellow-500 dark:hover:text-yellow-300 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 justify-center items-center cursor-pointer dark:font-semibold ">
                    Add to Watchlist
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      {visibleReviews.length > 0 && (
        <div className="mt-8">
          <Header title="User Reviews" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
            {visibleReviews.map((review) => (
              <div
                key={review.id}
                className="flex flex-col items-center bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 min-h-[300px]"
              >
                {/* Avatar */}
                {review?.author_details?.avatar_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w200${review.author_details.avatar_path}`}
                    alt={review.author_details.name || review.author}
                    className="w-20 h-20 object-cover rounded-full shadow-lg mb-4"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center mb-4">
                    <span className="text-gray-600 dark:text-gray-400 text-sm">
                      No Image
                    </span>
                  </div>
                )}

                {/* Name */}
                <h3 className="text-lg font-semibold text-[#4a90e2] dark:text-yellow-400 text-center">
                  {review.author_details.name || review.author}
                </h3>

                {/* Rating */}
                {review.author_details.rating && (
                  <p className="text-gray-700 dark:text-gray-300 font-medium">
                    ⭐ {review.author_details.rating}/10
                  </p>
                )}

                {/* Review Content */}
                <p className="text-gray-600 dark:text-gray-400 text-sm mt-2 text-center">
                  {review.content.length > 150
                    ? `${review.content.slice(0, 150)}...`
                    : review.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Reviews Section */}
    </div>
  );
}
