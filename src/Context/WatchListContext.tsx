import { createContext, useEffect, useState, ReactNode } from "react";
import { axiosInstanceURL, WatchList } from "../Services/EndPoints/URLS";

interface WatchListItem {
  poster_path: string | null;
  id: number;
  title?: string;
  name?: string;
  type: "movie" | "tv";
  vote_average?: number;
}

interface WatchListContextType {
  watchList: WatchListItem[] | undefined;
  isLoading: boolean;
  error: string | null;
  addMovieToWatchlist: (movie: { id: number }) => Promise<void>;
  addTvToWatchlist: (tv: { id: number }) => Promise<void>;
  removeFromWatchList: (mediaId: number, mediaType: "movie" | "tv") => void;
  movieWatchList: WatchListItem[];
  tvWatchList: WatchListItem[];
}

export const WatchListContext = createContext<WatchListContextType | null>(
  null
);

interface WatchListProviderProps {
  children: ReactNode;
}

export const WatchListProvider: React.FC<WatchListProviderProps> = ({
  children,
}) => {
  const [watchList, setWatchList] = useState<WatchListItem[] | undefined>(
    undefined
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [message, setMessage] = useState<string | null>(null);

  const getWatchList = async () => {
    const sessionId = localStorage.getItem("session_id");
    const accountId = Number(localStorage.getItem("account_id"));

    if (!sessionId || isNaN(accountId)) {
      setError("Invalid session or account ID");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const [moviesResponse, seriesResponse] = await Promise.all([
        axiosInstanceURL.get<{ results: WatchListItem[] }>(
          WatchList.Movie(accountId),
          { params: { session_id: sessionId } }
        ),
        axiosInstanceURL.get<{ results: WatchListItem[] }>(
          WatchList.Series(accountId),
          { params: { session_id: sessionId } }
        ),
      ]);

      const moviesWithType = moviesResponse.data.results.map(
        (item) =>
          ({
            ...item,
            type: "movie",
          } as WatchListItem)
      );

      const seriesWithType = seriesResponse.data.results.map(
        (item) =>
          ({
            ...item,
            type: "tv",
          } as WatchListItem)
      );

      setWatchList([...moviesWithType, ...seriesWithType]);
    } catch (error) {
      setError("Failed to fetch watchlist");
      console.error("Error fetching watchlist:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const addMovieToWatchlist = async (movie: { id: number }) => {
    const sessionId = localStorage.getItem("session_id");
    const accountId = Number(localStorage.getItem("account_id"));

    if (!sessionId || isNaN(accountId)) {
      setError("You must be logged in to add to watchlist");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await axiosInstanceURL.post(
        `/account/${accountId}/watchlist`,
        {
          media_type: "movie",
          media_id: movie.id,
          watchlist: true,
        },
        {
          params: { session_id: sessionId },
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
            accept: "application/json",
          },
        }
      );

      if (![1, 12].includes(response.data.status_code)) {
        throw new Error(response.data.status_message || "Unknown API error");
      }

      await getWatchList();
      setMessage("Movie added to watchlist!");
    } catch (err) {
      console.error("Error adding movie:", err);
      setError("Failed to add movie to watchlist");
    } finally {
      setIsLoading(false);
    }
  };

  const addTvToWatchlist = async (tv: { id: number }) => {
    const sessionId = localStorage.getItem("session_id");
    const accountId = Number(localStorage.getItem("account_id"));

    if (!sessionId || isNaN(accountId)) {
      setError("You must be logged in to add to watchlist");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await axiosInstanceURL.post(
        `/account/${accountId}/watchlist`,
        {
          media_type: "tv",
          media_id: tv.id,
          watchlist: true,
        },
        {
          params: { session_id: sessionId },
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
            accept: "application/json",
          },
        }
      );

      if (![1, 12].includes(response.data.status_code)) {
        throw new Error(response.data.status_message || "Unknown API error");
      }

      await getWatchList();
      setMessage("TV show added to watchlist!");
    } catch (err) {
      console.error("Error adding TV show:", err);
      setError("Failed to add TV show to watchlist");
    } finally {
      setIsLoading(false);
    }
  };

  const removeFromWatchList = async (
    mediaId: number,
    mediaType: "movie" | "tv"
  ) => {
    const sessionId = localStorage.getItem("session_id");
    const accountId = Number(localStorage.getItem("account_id"));

    if (!sessionId || isNaN(accountId)) {
      setError("Invalid session or account ID");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axiosInstanceURL.post(
        WatchList.Remove(accountId),
        {
          media_type: mediaType,
          media_id: mediaId,
          watchlist: false,
        },
        {
          params: { session_id: sessionId },
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
            accept: "application/json",
          },
        }
      );

      if (response.status === 200) {
        await getWatchList();
      }
    } catch (error) {
      setError("Failed to remove from watchlist");
      console.error("Error removing from watchlist:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getWatchList();
  }, []);

  const movieWatchList =
    watchList?.filter((item) => item.type === "movie") || [];
  const tvWatchList = watchList?.filter((item) => item.type === "tv") || [];

  return (
    <WatchListContext.Provider
      value={{
        watchList,
        isLoading,
        error,
        addMovieToWatchlist,
        addTvToWatchlist,
        removeFromWatchList,
        movieWatchList,
        tvWatchList,
      }}
    >
      {children}
    </WatchListContext.Provider>
  );
};
