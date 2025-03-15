import { memo, useEffect, useState } from "react";
import Loader from "../Loader/Loader";

const Hero = ({ fetchData, buttonText, onButtonClick }) => {
  const [isLoading, setisLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [featured, setFeatured] = useState(null);

  const getOverviewText = () => {
    const words = featured?.overview?.split(" ") || [];
    return window.innerWidth < 640
      ? words.slice(0, 20).join(" ")
      : words.slice(0, 38).join(" ");
  };

  useEffect(() => {
    fetchData().then((response) => {
      setItems(response?.data.results);
      setFeatured(response?.data.results[0]);
      setisLoading(false);
    });
  }, [fetchData]);

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
              backgroundImage: `url(https://image.tmdb.org/t/p/original${featured?.backdrop_path})`,
            }}
          >
            {/* Featured Item Details */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-left">
              <h1 className="text-4xl font-bold">
                {featured?.title || featured?.name}
              </h1>
              <p className="text-lg">{getOverviewText()}...</p>
              <div className="flex flex-col justify-center items-center">
                <div className="flex flex-wrap justify-center gap-4">
                  <button
                    onClick={onButtonClick}
                    className="bg-blue-500 min-w-[150px] text-white px-4 py-2 mt-4 rounded-lg hover:bg-blue-600 transition-colors flex justify-center items-center whitespace-nowrap cursor-pointer"
                  >
                    {buttonText}
                  </button>
                  <button className="bg-green-600 min-w-[150px] text-white px-4 py-2 mt-4 rounded-lg hover:bg-green-800 transition-colors flex justify-center items-center whitespace-nowrap cursor-pointer">
                    Add to Watchlist
                  </button>
                </div>
                <button className="px-4 py-2 mt-4 cursor-pointer rounded-lg hover:bg-gray-900 transition-colors bg-gray-600 text-yellow-400">
                  Read More
                </button>
              </div>
            </div>

            {/* Horizontal Scroll Container */}
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
                        setisLoading(true);
                        setTimeout(() => {
                          setFeatured(item);
                          setisLoading(false);
                        }, 500);
                      }}
                      alt={item.title || item.name}
                      className="w-full h-auto rounded-lg"
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
