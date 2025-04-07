import { memo, useContext, useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import { Link } from "react-router-dom";
import { WatchListContext } from "../../Context/WatchListContext";

// Movie Item Type
interface MovieItem {
  id: number;
  title?: string;
  name?: string;
  overview?: string;
  backdrop_path?: string;
  poster_path?: string;
}

// Props Type
interface HeroProps {
  fetchData: () => Promise<{ data: { results: MovieItem[] } }>;
  buttonText: string;
  onButtonClick: () => void;
  isshowingMovies: boolean;
}

interface WatchListContextType {
  addMovieToWatchlist: (item: MovieItem) => void;
  addTvToWatchlist: (item: MovieItem) => void;
}

const Hero: React.FC<HeroProps> = ({
  fetchData,
  buttonText,
  onButtonClick,
  isshowingMovies,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [items, setItems] = useState<MovieItem[]>([]);
  const [featured, setFeatured] = useState<MovieItem | null>(null);
  const [backgroundImage, setBackgroundImage] = useState<string>("");
  const { addMovieToWatchlist } = useContext(
    WatchListContext
  ) as unknown as WatchListContextType;
  const { addTvToWatchlist } = useContext(
    WatchListContext
  ) as unknown as WatchListContextType;

  const [message, setMessage] = useState<string>("");
  const accountId = localStorage.getItem("account_id");
  const [added, setAdded] = useState<boolean>(false);

  const handleAddtoWatchlist = async (media: MovieItem) => {
    if (!accountId) {
      setMessage("Please log in to add items to your watchlist.");
      setTimeout(() => setMessage(""), 3000); // Clear message after 3 seconds
      return;
    }

    setIsLoading(true);
    setMessage("Adding to watchlist...");

    try {
      // Check if item is already in watchlist
      const watchlist = JSON.parse(localStorage.getItem("watchlist") || "[]");
      const isAlreadyAdded = watchlist.some(
        (item: MovieItem) => item.id === media.id
      );

      if (isAlreadyAdded) {
        setMessage("This item is already in your watchlist!");
        setAdded(true);
        return;
      }

      // Determine if it's a movie or TV series based on the 'isshowingMovies' prop
      if (isshowingMovies) {
        addMovieToWatchlist(media);
        setMessage("Movie added to watchlist!");
      } else {
        addTvToWatchlist(media);
        setMessage("TV show added to watchlist!");
      }

      // Update the localStorage with the full media object
      watchlist.push(media);
      localStorage.setItem("watchlist", JSON.stringify(watchlist));

      setAdded(true);
    } catch (error) {
      console.error("Error adding to watchlist:", error);
      setMessage("Failed to add to watchlist.");
    } finally {
      setIsLoading(false);
      setTimeout(() => setMessage(""), 3000); // Clear message after 3 seconds
    }
  };

  // Reset added state when featured item changes
  useEffect(() => {
    if (featured) {
      const watchlist = JSON.parse(localStorage.getItem("watchlist") || "[]");
      setAdded(watchlist.some((item: MovieItem) => item.id === featured.id));
    }
  }, [featured]);

  useEffect(() => {
    fetchData().then((response) => {
      setItems(response?.data.results);
      setFeatured(response?.data.results[0]);
      setIsLoading(false);
    });
  }, [fetchData]);

  // Load high-resolution image after component mounts
  useEffect(() => {
    if (featured?.backdrop_path) {
      const lowResImage = `https://image.tmdb.org/t/p/w500${featured.backdrop_path}`;
      const highResImage = `https://image.tmdb.org/t/p/original${featured.backdrop_path}`;

      // Set low-resolution image initially
      setBackgroundImage(lowResImage);

      // Load high-resolution image in the background
      const img = new Image();
      img.src = highResImage;
      img.onload = () => {
        setBackgroundImage(highResImage);
      };
    }
  }, [featured]);

  // Generate truncated overview text
  const getOverviewText = (): string => {
    const words = featured?.overview?.split(" ") || [];
    return window.innerWidth < 640
      ? words.slice(0, 20).join(" ")
      : words.slice(0, 38).join(" ");
  };

  return (
    <div className="relative w-full h-[100vh] m-0 p-0 overflow-hidden">
      {isLoading ? (
        <Loader />
      ) : (
        featured && (
          <div
            className="w-full h-full bg-cover bg-center relative flex flex-col justify-start items-start 
              before:content-[''] before:w-full before:h-full before:flex-grow before:bg-gradient-to-b 
              before:from-black/70 before:to-transparent dark:before:bg-none dark:before:bg-black/50"
            style={{
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* Featured Content */}
            <div className="absolute top-72 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-left">
              <h1 className="text-4xl font-bold">
                {featured?.title || featured?.name}
              </h1>
              <p className="text-lg">{getOverviewText()}...</p>

              {/* Buttons */}
              <div className="flex flex-col justify-center items-center">
                <div className="flex justify-center gap-4">
                  <button
                    onClick={onButtonClick}
                    className="bg-blue-700 min-w-[150px] text-white px-4 py-2 mt-4 rounded-lg hover:bg-blue-600 transition-colors flex justify-center items-center whitespace-nowrap cursor-pointer"
                    aria-label={buttonText}
                  >
                    {buttonText}
                  </button>
                  <button
                    onClick={() => handleAddtoWatchlist(featured)}
                    disabled={added}
                    className={`min-w-[150px] text-white px-4 py-2 mt-4 rounded-lg transition-colors flex justify-center items-center whitespace-nowrap cursor-pointer ${
                      added
                        ? "bg-gray-500  cursor-not-allowed"
                        : "bg-green-700 hover:bg-green-800"
                    }`}
                    aria-label={added ? "Already added" : "Add to Watchlist"}
                  >
                    {added ? "Added to Watchlist" : "Add to Watchlist"}
                  </button>
                </div>
                {message && (
                  <div className="mt-2 text-center text-yellow-400">
                    {message}
                  </div>
                )}
                {isshowingMovies ? (
                  <Link to={`MoviesDetailsPage/${featured.id}`}>
                    <button
                      className="px-4 py-2 mt-4 cursor-pointer rounded-lg hover:bg-gray-900 transition-colors bg-gray-600 text-yellow-400"
                      aria-label="Read More"
                    >
                      Read More
                    </button>
                  </Link>
                ) : (
                  <Link to={`SeriesDetailsPage/${featured.id}`}>
                    <button
                      className="px-4 py-2 mt-4 cursor-pointer rounded-lg hover:bg-gray-900 transition-colors bg-gray-600 text-yellow-400"
                      aria-label="Read More"
                    >
                      Read More
                    </button>
                  </Link>
                )}
              </div>
            </div>

            {/* Small Image List */}
            <div className="relative w-full px-4 h-[70vh] overflow-x-auto scrollbar-custom shadow-lg rounded-lg">
              <div className="flex gap-4 p-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex-shrink-0 hover:scale-110 cursor-pointer transition-all w-[40vw] md:w-[12vw]"
                  >
                    <img
                      src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                      onClick={() => {
                        setIsLoading(true);
                        setTimeout(() => {
                          setFeatured(item);
                          setIsLoading(false);
                        }, 500);
                      }}
                      alt={item.title || item.name}
                      className="w-full h-auto rounded-lg"
                      loading="lazy"
                      width={500}
                      height={750}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default memo(Hero);
