import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react"; // Import lazy & Suspense for code-splitting
import "./App.css";
import Layout from "./assets/Components/Layout/Layout";
import Loader from "./assets/Components/Loader/Loader";
import MoviesDetailsPage from "./assets/Pages/Details/MoviesDetailsPage";
import SeriesDetailsPage from "./assets/Pages/Details/SeriesDetailsPage";
import Movies from "./assets/Pages/Movies/MoviesPage";
import SeriessPage from "./assets/Pages/Series/SeriesPage";
import SearchResults from "./assets/Pages/SearchResults/SearchResultsM";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SearchResultsS from "./assets/Pages/SearchResults/SearchResultsS";

// Lazy-load the Home component using dynamic import()
const Home = lazy(() => import("./assets/Pages/Home/Home"));
const queryClient = new QueryClient();

function App() {
  // Define routes using createBrowserRouter

  const routes = createBrowserRouter([
    {
      path: "",
      element: (
        <Suspense fallback={<Loader />}>
          <Layout />
        </Suspense>
      ),
      children: [
        { index: true, element: <Home /> },
        { path: "home", element: <Home /> },
        {
          path: "MoviesDetailsPage/:id", // Update here
          element: <MoviesDetailsPage />,
        },
        {
          path: "SeriesDetailsPage/:id", // Update here
          element: <SeriesDetailsPage />,
        },
        {
          path: "Movies",
          element: <Movies />,
        },
        {
          path: "Series",
          element: <SeriessPage />,
        },
        {
          path: "searchMovies/:inputValue",
          element: <SearchResults />,
        },
        {
          path: "searchSeries/:inputValue",
          element: <SearchResultsS />,
        },
      ],
    },
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={routes} />;
    </QueryClientProvider>
  );
}

// <RouterProvider router={routes}></RouterProvider>
// <ReactQueryDevtools initialIsOpen={false} />{" "}
// </>

export default App;
