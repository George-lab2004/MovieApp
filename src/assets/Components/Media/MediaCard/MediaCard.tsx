import { Link } from "react-router-dom";
interface Similar {
  original_title?: string;
  poster_path?: string;
  vote_average?: number;
  id: number;
  name?: string;
}
export default function MediaCard({
  media,
  show,
}: {
  media: Similar;
  show: boolean;
}) {
  return (
    <div
      key={media.id}
      className="min-w-[250px] max-w-xs w-full bg-gray-100 dark:bg-zinc-900 border border-gray-300 dark:border-gray-700 rounded-lg shadow h-[500px] flex-shrink-0 mx-2 mb-4"
    >
      <img
        className="rounded-t-lg h-64 w-full object-cover"
        src={`https://image.tmdb.org/t/p/w500${media.poster_path}`}
        alt={media.original_title}
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
                onClick={() => console.log(`media ID: ${media.id}`)}
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
                onClick={() => console.log(`media ID: ${media.id}`)}
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

          <button className="inline-flex w-full px-3 py-2 text-sm text-blue-600 dark:text-blue-400 font-medium text-center bg-gray-200 dark:bg-gray-800 rounded-xl focus:ring-4 hover:text-yellow-500 dark:hover:text-yellow-300 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 justify-center items-center cursor-pointer dark:font-semibold ">
            Add to Watchlist
          </button>
        </div>
      </div>
    </div>
  );
}
