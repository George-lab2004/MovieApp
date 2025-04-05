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
  movieWatchList: WatchListItem[] | undefined;
  tvWatchList: WatchListItem[] | undefined;
  isLoading: boolean;
  error: string | null;
  addMovieToWatchlist: (movieId: number) => void;
  addTvToWatchlist: (tvId: number) => void;
  removeFromWatchList: (mediaId: number, mediaType: "movie" | "tv") => void;
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
  const [movieWatchList, setMovieWatchList] = useState<
    WatchListItem[] | undefined
  >(undefined);
  const [tvWatchList, setTvWatchList] = useState<WatchListItem[] | undefined>(
    undefined
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [message, setMessage] = useState<string | null>(null);

  const getMovieWatchList = async () => {
    const sessionId = localStorage.getItem("session_id");
    const accountId = Number(localStorage.getItem("account_id"));

    if (!sessionId || isNaN(accountId)) {
      setError("Invalid session or account ID");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await axiosInstanceURL.get<{ results: WatchListItem[] }>(
        `https://api.themoviedb.org/3/account/${accountId}/watchlist/movies`,
        {
          params: { session_id: sessionId },
        }
      );

      setMovieWatchList(response.data.results);
    } catch (error) {
      setError("Failed to fetch movies watchlist");
      console.error("Error fetching movies watchlist:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getTvWatchList = async () => {
    const sessionId = localStorage.getItem("session_id");
    const accountId = Number(localStorage.getItem("account_id"));

    if (!sessionId || isNaN(accountId)) {
      setError("Invalid session or account ID");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await axiosInstanceURL.get<{ results: WatchListItem[] }>(
        `https://api.themoviedb.org/3/account/${accountId}/watchlist/tv`,
        {
          params: { session_id: sessionId },
        }
      );

      setTvWatchList(response.data.results);
    } catch (error) {
      setError("Failed to fetch TV shows watchlist");
      console.error("Error fetching TV shows watchlist:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const addMovieToWatchlist = async (movieId: number) => {
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
          media_id: movieId,
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

      await getMovieWatchList();
      setMessage("Movie added to watchlist!");
    } catch (err) {
      console.error("Error adding movie:", err);
      setError("Failed to add movie to watchlist");
    } finally {
      setIsLoading(false);
    }
  };

  const addTvToWatchlist = async (tvId: number) => {
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
          media_id: tvId,
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

      await getTvWatchList();
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
            Authorization: `Bearer ${process.env.VITE_TMDB_ACCESS_TOKEN}`,
            accept: "application/json",
          },
        }
      );

      if (response.status === 200) {
        // Refresh movie and TV watchlists separately
        if (mediaType === "movie") {
          await getMovieWatchList();
        } else {
          await getTvWatchList();
        }
      }
    } catch (error) {
      setError("Failed to remove from watchlist");
      console.error("Error removing from watchlist:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getMovieWatchList();
    getTvWatchList();
  }, []);

  return (
    <WatchListContext.Provider
      value={{
        movieWatchList,
        tvWatchList,
        isLoading,
        error,
        addMovieToWatchlist,
        addTvToWatchlist,
        removeFromWatchList,
      }}
    >
      {children}
    </WatchListContext.Provider>
  );
};
