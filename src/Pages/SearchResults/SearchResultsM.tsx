import { useParams } from "react-router-dom";
import { useState } from "react";
import { CgArrowLongLeft, CgArrowLongRight } from "react-icons/cg";
import Loader from "../../Components/Loader/Loader";
import MediaCard from "../../Components/Media/MediaCard/MediaCard";
import { useQuery } from "@tanstack/react-query";
import { axiosInstanceURL, Search } from "../../Services/EndPoints/URLS";
import Header from "../../Components/Shared/Header";

export default function Searches() {
  const { inputValue } = useParams<{ inputValue: string }>(); // Get the inputValue from URL
  const [page, setPage] = useState(1); // State for current page
  const [totalPages, setTotalPages] = useState<number | null>(null); // State for total pages

  // Fetch search results manually
  const { data, isError, isLoading } = useQuery({
    queryKey: ["search", inputValue, page], // Add page to query key
    queryFn: async () => {
      if (!inputValue) {
        throw new Error("Input value is undefined");
      }
      const response = await axiosInstanceURL.get(Search.Movie(inputValue), {
        params: { page },
      });
      setTotalPages(response.data.total_pages); // Update total pages
      return response.data.results; // Return results directly
    },
  }); // Runs when inputValue or page changes

  const handleNextPage = () => {
    if (page < (totalPages ?? 1)) setPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  // Show loading state
  if (isLoading)
    return (
      <p>
        <Loader />
      </p>
    );

  // Show error state
  if (isError) return <p>Error fetching movies. Try again later.</p>;

  return (
    <div className="Movies">
      <Header title={`Search Results for ${inputValue}`} />

      {/* Page Count Display */}
      <div className="flex justify-center mb-4">
        <span className="text-lg font-medium text-blue-500">
          Page {page} of {totalPages ?? "Loading..."}
        </span>
      </div>

      {/* Movie Cards Section */}
      <div className="relative flex flex-wrap justify-center space-x-4 p-5">
        {data && data.length > 0 ? (
          data.map(
            (movie: {
              id: number;
              title: string;
              overview: string;
              poster_path: string;
            }) => <MediaCard key={movie.id} media={movie} show={true} />
          )
        ) : (
          <p className="text-center text-gray-400">No results found.</p>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="flex flex-wrap justify-center mt-1 mb-auto sm:mb-6 space-x-2 sm:space-x-6">
        <button
          className={`flex cursor-pointer items-center px-3 py-1 sm:px-5 sm:py-2 text-sm sm:text-base rounded-full font-semibold shadow-md transition-all duration-300 
      ${
        page === 1
          ? "bg-gray-300 text-gray-500 cursor-not-allowed opacity-50 dark:bg-gray-700 dark:text-gray-400"
          : "bg-blue-500 text-white hover:bg-blue-600 active:scale-95 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-600"
      }`}
          onClick={handlePrevPage}
          disabled={page === 1}
          aria-label="Previous"
        >
          <CgArrowLongLeft className="mr-1 sm:mr-2" /> Previous
        </button>

        <span className="px-4 py-1 sm:px-6 sm:py-2 text-sm sm:text-lg font-semibold bg-gray-100 text-blue-700 rounded-lg shadow-sm dark:bg-gray-800 dark:text-gray-300">
          Page {page} of {totalPages ?? "Loading..."}
        </span>

        <button
          className={`flex  cursor-pointer items-center px-3 py-1 sm:px-5 sm:py-2 text-sm sm:text-base rounded-full font-semibold shadow-md transition-all duration-300 
      ${
        page >= (totalPages ?? 1)
          ? "bg-gray-300 text-gray-500 cursor-not-allowed opacity-50 dark:bg-gray-700 dark:text-gray-400"
          : "bg-blue-500 text-white hover:bg-blue-600 active:scale-95 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-600"
      }`}
          onClick={handleNextPage}
          disabled={page >= (totalPages ?? 1)}
          aria-label="Next"
        >
          Next <CgArrowLongRight className="ml-1 sm:ml-2" />
        </button>
      </div>
    </div>
  );
}
