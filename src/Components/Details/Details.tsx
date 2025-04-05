import { AiFillStar } from "react-icons/ai";
import { AiFillCloseCircle } from "react-icons/ai";
import { useRef, useState } from "react";
import AnimatedText from "../Shared/AnimatedText";
import "../../Pages/Home/Home.css";
import { Link } from "react-router-dom";
import Header from "../Shared/Header";
import { motion, useInView } from "framer-motion";
import { Dialog, DialogBackdrop, DialogTitle } from "@headlessui/react";
import React from "react";
import MediaCard from "../Media/MediaCard/MediaCard";

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
  name?: string;
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
  show?: boolean;
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
  updated_at?: string | null;
}
export default function Details({
  item,
  actors,
  similar,
  Reviews,
  show,
}: DetailsProps) {
  const [showAllActors, setShowAllActors] = useState(false);

  // Limit to top 8 actors unless "Show More" is clicked
  const visibleActors = showAllActors ? actors : actors.slice(0, 8);
  const visibleSimilar = similar.slice(0, 8);
  const visibleReviews = Reviews.slice(0, 9);
  const containerVariants = {
    hidden: { y: 50, opacity: 0, scale: 0.95 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.15 },
    },
    exit: { y: 50, opacity: 0, scale: 0.95 },
  };
  const castVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.5 } },
  };
  const childVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.5 } },
  };
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px 0px" });
  const isInViewtwo = useInView(ref, { once: true, margin: "-100px 0px" });

  const [display, setDisplay] = useState(false);
  const [selectedReview, setSelectedReview] = useState<Reviews | null>(null); // Store the selected review

  const handleShow = (review: Reviews) => {
    setSelectedReview(review); // Set the selected review
    setDisplay(true);
  };

  const handleClose = () => {
    setDisplay(false);
    setSelectedReview(null); // Clear the selected review
  };

  return (
    <div className="min-h-screen p-8 transition-colors bg-gradient-to-b from-gray-100 to-gray-300 text-gray-800 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 dark:text-gray-200">
      {/* Movie Container */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="max-w-5xl mx-auto p-6 rounded-xl shadow-xl bg-gray-100 bg-opacity-90 border border-gray-200 dark:bg-gray-800 dark:bg-opacity-80 dark:border-gray-700"
      >
        {/* Header */}
        <motion.div
          variants={childVariants}
          className="flex flex-col md:flex-row items-center space-x-6 mb-8"
        >
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
        </motion.div>

        {/* Overview Section */}
        {item.overview && (
          <motion.div variants={childVariants} className="my-6">
            <h2 className="text-2xl font-semibold text-[#4a90e2] dark:text-yellow-400">
              Overview
            </h2>
            <motion.p
              variants={childVariants}
              className="mt-2 leading-relaxed text-gray-700 dark:text-gray-300"
            >
              {item.overview}
            </motion.p>
          </motion.div>
        )}

        {/* Info Grid */}
        <motion.div
          variants={childVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8"
        >
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
            <motion.ul
              variants={childVariants}
              className="mt-2 text-gray-600 dark:text-gray-400"
            >
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
            </motion.ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
              Details
            </h3>
            <motion.ul
              variants={childVariants}
              className="mt-2 text-gray-600 dark:text-gray-400"
            >
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
            </motion.ul>
          </div>
        </motion.div>

        {/* Ratings */}
        {item.vote_average !== undefined && (
          <motion.div variants={childVariants} className="mt-8">
            <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300">
              Ratings
            </h2>
            <div className="flex items-center mt-2">
              <span className="text-3xl font-bold text-[#4a90e2] dark:text-yellow-400">
                {item.vote_average.toFixed(1)}
              </span>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Cast Section */}
      <div className="my-8">
        <Header title="Cast " />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
          {visibleActors.map((actor) => (
            <motion.div
              ref={ref}
              variants={castVariants}
              initial="hidden"
              animate={isInViewtwo ? "visible" : "hidden"}
              whileHover={{ scale: 1.05 }}
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
            </motion.div>
          ))}
        </div>

        {actors.length > 8 && (
          <div className="mt-6 text-center">
            <button
              onClick={() => setShowAllActors(!showAllActors)}
              className="px-4 py-2 bg-[#4a90e2] dark:bg-yellow-400 text-white dark:text-gray-900 rounded-lg shadow-md hover:bg-[#357abd] dark:hover:bg-yellow-300 transition cursor-pointer"
              aria-label=" Show More Actors"
            >
              {showAllActors ? "Show Less" : "Show More"}
            </button>
          </div>
        )}
      </div>
      <Header title="Similar Shows" />
      {/* Similar Shows Sectiom */}
      <section className="mt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {visibleSimilar.map((movie) => (
            <MediaCard key={movie.id} media={movie} show={show} />
          ))}
        </div>
      </section>
      {/* Reviews Section */}
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
                  {review.content.length > 150 && ( // Conditionally render the "Read More" button
                    <button
                      onClick={() => handleShow(review)} // Pass the review to handleShow
                      className="text-blue-500 font-semibold ml-1 transition cursor-pointer hover:text-blue-700"
                      aria-label="Read More"
                    >
                      Read More
                    </button>
                  )}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Dialog for Full Review */}
      <Dialog open={display} onClose={handleClose} className="relative z-50">
        <DialogBackdrop className="fixed inset-0 bg-black/60" />

        {selectedReview && (
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="bg-white dark:bg-gray-900 rounded-lg shadow-xl max-w-3xl w-full p-6 sm:p-8 flex flex-col md:flex-row gap-6 max-h-[90vh] overflow-y-auto"
            >
              {/* Avatar */}
              <div className="w-full md:w-1/3 flex flex-col items-center gap-4">
                {selectedReview?.author_details?.avatar_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w200${selectedReview.author_details.avatar_path}`}
                    alt={
                      selectedReview.author_details.name ||
                      selectedReview.author
                    }
                    className="w-24 h-24 object-cover rounded-full shadow-lg"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center">
                    <span className="text-gray-600 dark:text-gray-400 text-sm">
                      No Image
                    </span>
                  </div>
                )}
                <div className="dark:text-white flex flex-col gap-2 text-sm">
                  <span className="font-semibold opacity-80">
                    📅 Created: {selectedReview.created_at.slice(0, 10)}
                  </span>
                  {selectedReview?.updated_at && (
                    <span className="font-semibold italic dark:text-gray-300">
                      🔄 Updated: {selectedReview.updated_at.slice(0, 10)}
                    </span>
                  )}
                </div>
              </div>

              {/* Details */}
              <div className="w-full md:w-2/3 relative">
                <button
                  onClick={handleClose}
                  className="absolute cursor-pointer top-2 right-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition text-2xl"
                  aria-label="Close Dialog"
                >
                  <AiFillCloseCircle />
                </button>

                <DialogTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {selectedReview.author_details.name || selectedReview.author}
                </DialogTitle>

                {/* Rating */}
                {selectedReview.author_details.rating && (
                  <p className="text-gray-700 dark:text-gray-300 font-medium mt-1 flex items-center">
                    <AiFillStar className="text-yellow-500 mr-1" />
                    {selectedReview.author_details.rating}/10
                  </p>
                )}

                {/* Review Content */}
                <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
                  {selectedReview.content}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </Dialog>
    </div>
  );
}
