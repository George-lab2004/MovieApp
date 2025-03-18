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
};
export const Series = {
  Trending: "/trending/tv/week",
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
