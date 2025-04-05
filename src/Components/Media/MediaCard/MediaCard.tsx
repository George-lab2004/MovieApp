import { Link } from "react-router-dom";
import { useContext, useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { WatchListContext } from "../../../Context/WatchListContext";

interface Similar {
  original_title?: string;
  poster_path?: string;
  vote_average?: number;
  id: number;
  name?: string;
}

interface WatchListContextType {
  addMovieToWatchlist: (item: Similar) => void;
  addTvToWatchlist: (item: Similar) => void;
}

export default function MediaCard({
  media,
  show,
  addedWatchList,
}: {
  media: Similar;
  show: boolean;
  addedWatchList?: boolean;
}) {
  const { addMovieToWatchlist } = useContext(
    WatchListContext
  ) as unknown as WatchListContextType;
  const { addTvToWatchlist } = useContext(
    WatchListContext
  ) as unknown as WatchListContextType;

  const [message, setMessage] = useState<string>("");
  const accountId = localStorage.getItem("account_id");
  const [added, setAdded] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Check if the media is already added on mount
  useEffect(() => {
    const watchlist = JSON.parse(localStorage.getItem("watchlist") || "[]");
    const isItemAdded = watchlist.some((item: Similar) => item.id === media.id);
    setAdded(isItemAdded);
  }, [media.id]);

  const handleAddtoWatchlist = async (media: Similar) => {
    if (!accountId) {
      setMessage("Please log in to add items to your watchlist.");
      return;
    }

    setIsLoading(true);
    setMessage("Adding to watchlist...");

    try {
      if (show) {
        await Promise.resolve(addMovieToWatchlist(media)); // mimic async if not async
        setMessage("Movie added to watchlist!");
      } else {
        await Promise.resolve(addTvToWatchlist(media));
        setMessage("TV added to watchlist!");
      }

      // Update the localStorage
      const watchlist = JSON.parse(localStorage.getItem("watchlist") || "[]");
      watchlist.push(media);
      localStorage.setItem("watchlist", JSON.stringify(watchlist));

      setAdded(true);
    } catch (error) {
      console.error("Error adding to watchlist:", error);
      setMessage("Failed to add to watchlist.");
    } finally {
      setIsLoading(false);
    }
  };

  const castVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" });

  return (
    <motion.div
      ref={ref}
      variants={castVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      key={media.id}
      className="min-w-[250px] max-w-xs w-full bg-gray-100 dark:bg-zinc-900 border border-gray-300 dark:border-gray-700 rounded-lg shadow h-[500px] flex-shrink-0 mx-2 mb-4"
    >
      <img
        className="rounded-t-lg h-64 w-full object-cover"
        src={`https://image.tmdb.org/t/p/w500${media.poster_path}`}
        alt={media.original_title || media.name}
      />
      <span className="absolute ps-14 pt-5 dark:text-white flex w-72">
        <span className="text-blue-700 dark:text-blue-300">Rating :</span> ⭐
        {media.vote_average}
      </span>
      <div className="p-5 pt-16 text-gray-900 dark:text-white text-center">
        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-800 dark:text-white">
          {(media.original_title ?? "").length > 20
            ? `${media.original_title?.slice(0, 20)}...`
            : media.original_title}
          {(media.name ?? "").length > 20
            ? `${media.name?.slice(0, 20)}...`
            : media.name}
        </h5>
        <div className="flex flex-col">
          {show ? (
            <Link to={`/MoviesDetailsPage/${media.id}`}>
              <button
                className="inline-flex w-full px-3 py-2 text-sm font-medium text-center text-white bg-blue-600 dark:bg-blue-700 rounded-xl hover:bg-blue-800 dark:hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 justify-center cursor-pointer dark:hover:text-yellow-300 dark:font-semibold items-center mb-5"
                aria-label="Read More"
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
          ) : (
            <Link to={`/SeriesDetailsPage/${media.id}`}>
              <button
                className="inline-flex w-full px-3 py-2 text-sm font-medium text-center text-white bg-blue-600 dark:bg-blue-700 rounded-xl hover:bg-blue-800 dark:hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 justify-center cursor-pointer dark:hover:text-yellow-300 dark:font-semibold items-center mb-5"
                aria-label="Read More"
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
          )}
          {addedWatchList ? (
            ""
          ) : (
            <button
              onClick={() => handleAddtoWatchlist(media.id)}
              disabled={added || isLoading}
              className={`w-full inline-flex justify-center items-center px-4 py-2 text-sm font-medium rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 transition
            ${
              added
                ? "cursor-not-allowed text-gray-400 bg-gray-300 dark:text-blue-400 dark:bg-zinc-800"
                : "cursor-pointer text-blue-700 bg-white hover:text-blue-800 hover:bg-blue-50 dark:text-blue-400 dark:bg-zinc-800 dark:hover:text-yellow-300 dark:hover:bg-zinc-700"
            }
          `}
            >
              {isLoading ? "Adding..." : added ? "Added" : "Add to Watchlist"}
            </button>
          )}

          {/* Feedback Message */}
          {message && (
            <div
              className={`mt-3 px-3 py-2 text-sm rounded-md
    ${
      message.includes("Failed")
        ? "bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300"
        : "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300"
    }
  `}
            >
              {message}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
