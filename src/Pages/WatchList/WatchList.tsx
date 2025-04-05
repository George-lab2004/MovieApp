import { useContext } from "react";
import { WatchListContext } from "../../Context/WatchListContext";
import MediaCard from "../../Components/Media/MediaCard/MediaCard";

const Watchlist = () => {
  // Removed mediaType from here; not being used in the component directly
  const context = useContext(WatchListContext);

  if (!context) {
    return <div>Loading watchlist data...</div>;
  }

  const { movieWatchList, tvWatchList } = context;

  // Handle loading state

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-center font-mono font-semibold text-3xl mb-6 text-gray-800 dark:text-white">
        Your Watchlist
      </h1>

      <div className="relative flex flex-wrap justify-center space-x-4 p-5">
        {(tvWatchList ?? []).map((item) => (
          <div key={item.id}>
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

      <div className="relative flex flex-wrap justify-center space-x-4 p-5">
        {(movieWatchList ?? []).map((item) => (
          <div key={item.id}>
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
  );
};

export default Watchlist;
