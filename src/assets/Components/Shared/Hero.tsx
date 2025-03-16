import { memo, useEffect, useState } from "react";
import Loader from "../Loader/Loader";

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
}

const Hero: React.FC<HeroProps> = ({
  fetchData,
  buttonText,
  onButtonClick,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [items, setItems] = useState<MovieItem[]>([]);
  const [featured, setFeatured] = useState<MovieItem | null>(null);
  const [backgroundImage, setBackgroundImage] = useState<string>("");

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
      const lowResImage = `https://image.tmdb.org/t/p/w200${featured.backdrop_path}`;
      const highResImage = `https://image.tmdb.org/t/p/original${featured.backdrop_path}`;

      // Set low-resolution image initially
      setBackgroundImage(lowResImage);

      // Load high-resolution image in the background
      const img = new Image();
      img.src = highResImage;
      img.onload = () => {
        // Once the high-resolution image is loaded, update the state
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
    <div className="relative w-screen overflow-x-scroll h-screen m-0 p-0 sm:min-h-[150vh] md:min-h-[110vh]">
      {isLoading ? (
        <Loader />
      ) : (
        featured && (
          <div
            className="w-full h-full bg-cover bg-center relative flex flex-col justify-start items-start overflow-x-hidden 
              before:content-[''] before:w-screen before:h-screen before:flex-grow before:bg-gradient-to-b 
              before:from-black/70 before:to-transparent dark:before:bg-none dark:before:bg-black/50"
            style={{
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* Featured Content */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-left">
              <h1 className="text-4xl font-bold">
                {featured?.title || featured?.name}
              </h1>
              <p className="text-lg">{getOverviewText()}...</p>

              {/* Buttons */}
              <div className="flex flex-col justify-center items-center">
                <div className="flex flex-wrap justify-center gap-4">
                  <button
                    onClick={onButtonClick}
                    className="bg-blue-700 min-w-[150px] text-white px-4 py-2 mt-4 rounded-lg hover:bg-blue-600 transition-colors flex justify-center items-center whitespace-nowrap cursor-pointer"
                    aria-label={buttonText}
                  >
                    {buttonText}
                  </button>
                  <button
                    className="bg-green-700 min-w-[150px] text-white px-4 py-2 mt-4 rounded-lg hover:bg-green-800 transition-colors flex justify-center items-center whitespace-nowrap cursor-pointer"
                    aria-label="Add to Watchlist"
                  >
                    Add to Watchlist
                  </button>
                </div>
                <button
                  className="px-4 py-2 mt-4 cursor-pointer rounded-lg hover:bg-gray-900 transition-colors bg-gray-600 text-yellow-400"
                  aria-label="Read More"
                >
                  Read More
                </button>
              </div>
            </div>

            {/* Small Image List */}
            <div className="relative w-full px-4 h-fit overflow-x-auto shadow-lg rounded-lg">
              <div className="flex gap-4 p-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex-shrink-0 hover:scale-110 cursor-pointer transition-all w-[40vw] md:w-[12vw]"
                  >
                    <img
                      src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
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
