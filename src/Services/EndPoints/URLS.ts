import axios from "axios";

// Load the API key from environment variables
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const baseURL = "https://api.themoviedb.org/3";

// Create an Axios instance with the base URL and default params
export const axiosInstanceURL = axios.create({
  baseURL: baseURL,
  params: {
    api_key: API_KEY, // Dynamically attach API key
  },
});

// API Endpoints
export const Movies = {
  Popular: "/movie/popular",
  Trending: "/trending/movie/week",
  TopRated: "/movie/top_rated",
  discover: "discover/movie",
  Upcoming: "/movie/upcoming",
};
export const filter = {
  Movies: (id: string) => `/discover/movie?with_genres=${id}`,
  Series: (id: string) => `/discover/tv?with_genres=${id}`,
};
export const Series = {
  Trending: "/trending/tv/week",
  TopRated: "/tv/top_rated",
  Upcoming: "/tv/upcoming",
};
export const Detail = {
  Movie: (id: string) => `/movie/${id}`,
  Series: (id: string) => `/tv/${id}`,
  MovieSimilar: (id: string) => `/movie/${id}/similar`,
  SeriesSimilar: (id: string) => `/tv/${id}/similar`,
  MoviesReviews: (id: string) => `/movie/${id}/reviews`,
  SeriesReviews: (id: string) => `/tv/${id}/reviews`,
};
export const Actors = {
  Movie: (id: string) => `/movie/${id}/credits`,
  Series: (id: string) => `/tv/${id}/credits`,
};
export const Search = {
  Movie: (query: string) => `/search/movie?query=${query}`,
  Series: (query: string) => `/search/tv?query=${query}`,
  Multi: (query: string) => `/search/multi?query=${query}`,
  People: (query: string) => `/search/person?query=${query}`,
};
export const TokenSession = {
  Token: "/authentication/token/new",
  Session: "/authentication/session/new",
  AccountID: "/account",
};
// export const WatchList = {
//   Movie: (accountId: string) => `/account/${accountId}/watchlist/movies`,
//   Series: (accountId: string) => `/account/${accountId}/watchlist/tv`,
//   AddMovie: (accountId: string) =>
//     `/account/${accountId}/watchlist?session_id=${localStorage.getItem(
//       "session_id"
//     )}`,
//   AddSeries: (accountId: string) =>
//     `/account/${accountId}/watchlist?session_id=${localStorage.getItem(
//       "session_id"
//     )}`,
//   RemoveMovie: (accountId: string, mediaId: string) =>
//     `/account/${accountId}/watchlist?session_id=${localStorage.getItem(
//       "session_id"
//     )}`,
//   RemoveSeries: (accountId: string, mediaId: string) =>
//     `/account/${accountId}/watchlist?session_id=${localStorage.getItem(
//       "session_id"
//     )}`,
// };
export const WatchList = {
  Movie: (accountId: number) => `/account/${accountId}/watchlist/movies`,
  Series: (accountId: number) => `/account/${accountId}/watchlist/tv`,
  Add: (accountId: number) => `/account/${accountId}/watchlist`,
  Remove: (accountId: number) => `/account/${accountId}/watchlist`,
};
