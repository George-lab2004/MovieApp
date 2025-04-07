import { useContext } from "react";
import { WatchListContext } from "../../Context/WatchListContext";
import MediaCard from "../../Components/Media/MediaCard/MediaCard";
import Header from "../../Components/Shared/Header";

const Watchlist = () => {
  const context = useContext(WatchListContext);

  if (!context) {
    return <div>Loading watchlist data...</div>;
  }

  const { movieWatchList, tvWatchList } = context;

  return (
    <div className="container mx-auto px-4 py-8">
      <Header title="Watchlist" />

      {/* TV Shows Section */}
      <div className="mb-12">
        <div className="relative flex items-center justify-center my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t-2 border-gray-300 dark:border-gray-600"></div>
          </div>
          <div className="relative flex items-center px-4">
            <div className="flex items-center space-x-3 bg-gradient-to-r from-blue-500 to-purple-600 dark:from-blue-600 dark:to-purple-700 text-white px-6 py-3 rounded-lg shadow-lg transform transition-all hover:scale-105 hover:shadow-xl">
              <i className="fas fa-tv "></i>
              <h3 className="text-xs font-bold tracking-wide uppercase">
                TV Shows
              </h3>
              <span className="bg-white text-blue-600 text-xs font-bold px-2 py-1 rounded-full ml-2">
                {tvWatchList?.length || 0}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-16 justify-center">
          {(tvWatchList ?? []).map((item) => (
            <div key={item.id} className="flex justify-center">
              <MediaCard
                media={{
                  ...item,
                  poster_path: item.poster_path ?? undefined,
                }}
                show={false}
                addedWatchList={true}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Movies Section */}
      <div>
        <div className="relative flex items-center justify-center my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t-2 border-gray-300 dark:border-gray-600"></div>
          </div>
          <div className="relative flex items-center px-4">
            <div className="flex items-center space-x-3 bg-gradient-to-r from-red-500 to-yellow-500 dark:from-red-600 dark:to-yellow-600 text-white px-6 py-3 rounded-lg shadow-lg transform transition-all hover:scale-105 hover:shadow-xl">
              <i className="fas fa-film "></i>
              <h3 className="text-xs font-bold tracking-wide uppercase">
                Movies
              </h3>
              <span className="bg-white text-red-600 text-xs font-bold px-2 py-1 rounded-full ml-2">
                {movieWatchList?.length || 0}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-16 justify-center">
          {(movieWatchList ?? []).map((item) => (
            <div key={item.id} className="flex justify-center">
              <MediaCard
                media={{
                  ...item,
                  poster_path: item.poster_path ?? undefined,
                }}
                show={true}
                addedWatchList={true}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Watchlist;
