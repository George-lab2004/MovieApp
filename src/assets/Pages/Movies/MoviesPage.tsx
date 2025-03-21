import { useEffect, useState } from "react";
import {
  axiosInstanceURL,
  filter,
  Movies,
} from "../../../Services/EndPoints/URLS";
import Header from "../../Components/Shared/Header";
import MediaCard from "../../Components/Media/MediaCard/MediaCard";
import Loader from "../../Components/Loader/Loader";
import { FaArrowLeft, FaArrowRight, FaFilm } from "react-icons/fa";

interface MoviesList {
  original_title?: string;
  poster_path?: string;
  vote_average?: number;
  id: number;
  name?: string;
}

export default function MoviesPage() {
  const [movies, setMovies] = useState<MoviesList[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState<number | null>(null);
  const [genre, setGenre] = useState<string | null>(null);
  const [activeGenre, setActiveGenre] = useState<string | null>(null);

  /**
   * Fetch movies from API based on the given page number.
   * @param page - The page number to fetch.
   * @param genreId - The genre ID for filtering.
   */
  async function fetchMovies(page: number, genreId: string | null = null) {
    setLoading(true);
    try {
      const params: { page: number; with_genres?: string } = { page };
      if (genreId) params.with_genres = genreId;

      const response = await axiosInstanceURL.get(
        genreId ? filter.Movies(genreId) : Movies.discover,
        { params }
      );

      setMovies(response.data.results);
      setTotalPages(response.data.total_pages); // ✅ Always update total pages
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchMovies(currentPage, genre);
  }, [currentPage, genre]);

  function handleGenreClick(id: string | null) {
    setGenre(id);
    setActiveGenre(id);
    setCurrentPage(1); // ✅ Reset page when changing genre
  }

  const genres = [
    { id: "28", name: "Action" },
    { id: "35", name: "Comedy" },
    { id: "18", name: "Drama" },
    { id: "10751", name: "Family" },
    { id: "27", name: "Horror" },
  ];

  return (
    <div className="Movies">
      <div className="mt-5">
        <Header title="Movies" />
      </div>

      {/* Genre Selection */}
      <div className="md:flex justify-center gap-4 p-4">
        {/* "All" Option */}
        <span
          onClick={() => handleGenreClick(null)}
          className={`flex my-2 items-center gap-2 px-4 py-2 rounded-full cursor-pointer transition 
            ${
              activeGenre === null
                ? "bg-red-500 text-white shadow-md scale-105 dark:bg-gray-800"
                : "bg-gray-200 text-gray-700 hover:bg-red-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
            }`}
        >
          <FaFilm />
          ALL
        </span>

        {/* Genre Options */}
        {genres.map((g) => (
          <span
            key={g.id}
            onClick={() => handleGenreClick(g.id)}
            className={`flex my-2 items-center gap-2 px-4 py-2 rounded-full cursor-pointer transition 
              ${
                activeGenre === g.id
                  ? "bg-blue-500 text-white shadow-md scale-105 dark:bg-gray-800"
                  : "bg-gray-200 text-gray-700 hover:bg-blue-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
              }`}
          >
            <FaFilm />
            {g.name}
          </span>
        ))}
      </div>

      {/* Page Count Display */}
      <div className="flex justify-center mb-4">
        <span className="text-lg font-medium text-blue-500">
          Page {currentPage} of {totalPages ?? "Loading..."}
        </span>
      </div>

      {/* Movie Cards Section */}
      <div className="relative flex flex-wrap justify-center space-x-4 p-5">
        {loading ? (
          <Loader />
        ) : (
          movies.map((movie) => (
            <MediaCard key={movie.id} media={movie} show={true} />
          ))
        )}
      </div>

      {/* Pagination Controls */}
      <div className="flex flex-wrap justify-center mt-1 mb-auto sm:mb-6 space-x-2 sm:space-x-6">
        <button
          className={`flex cursor-pointer items-center px-3 py-1 sm:px-5 sm:py-2 text-sm sm:text-base rounded-full font-semibold shadow-md transition-all duration-300 
      ${
        currentPage === 1
          ? "bg-gray-300 text-gray-500 cursor-not-allowed opacity-50 dark:bg-gray-700 dark:text-gray-400"
          : "bg-blue-500 text-white hover:bg-blue-600 active:scale-95 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-600"
      }`}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          <FaArrowLeft className="mr-1 sm:mr-2" /> Previous
        </button>

        <span className="px-4 py-1 sm:px-6 sm:py-2 text-sm sm:text-lg font-semibold bg-gray-100 text-blue-700 rounded-lg shadow-sm dark:bg-gray-800 dark:text-gray-300">
          Page {currentPage} of {totalPages ?? "Loading..."}
        </span>

        <button
          className={`flex  cursor-pointer items-center px-3 py-1 sm:px-5 sm:py-2 text-sm sm:text-base rounded-full font-semibold shadow-md transition-all duration-300 
      ${
        currentPage >= (totalPages ?? 1)
          ? "bg-gray-300 text-gray-500 cursor-not-allowed opacity-50 dark:bg-gray-700 dark:text-gray-400"
          : "bg-blue-500 text-white hover:bg-blue-600 active:scale-95 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-600"
      }`}
          onClick={() =>
            setCurrentPage((prev) =>
              prev < (totalPages ?? 1) ? prev + 1 : prev
            )
          }
          disabled={currentPage >= (totalPages ?? 1)}
        >
          Next <FaArrowRight className="ml-1 sm:ml-2" />
        </button>
      </div>
    </div>
  );
}
