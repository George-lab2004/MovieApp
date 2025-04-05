import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react"; // Import lazy & Suspense for code-splitting
import "./App.css";
import Layout from "./Components/Layout/Layout";
import Loader from "./Components/Loader/Loader";
import MoviesDetailsPage from "./Pages/Details/MoviesDetailsPage";
import SeriesDetailsPage from "./Pages/Details/SeriesDetailsPage";
import Movies from "./Pages/Movies/MoviesPage";
import SeriessPage from "./Pages/Series/SeriesPage";
import SearchResults from "./Pages/SearchResults/SearchResultsM";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SearchResultsS from "./Pages/SearchResults/SearchResultsS";
import Login from "./Pages/Auth/Login";
import SignUp from "./Pages/Auth/SignUp";
import ForgetPass from "./Pages/Auth/ForgetPass";
import LogOut from "./Pages/Auth/Logout";
import Watchlist from "./Pages/WatchList/WatchList";
// Lazy-load the Home component using dynamic import()
const Home = lazy(() => import("./Pages/Home/Home"));
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
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "signup",
          element: <SignUp />,
        },
        {
          path: "passwd",
          element: <ForgetPass />,
        },
        {
          path: "logOut",
          element: <LogOut />,
        },
        {
          path: "watchlist",
          element: (
            // <ProtuctedRoutes>
            <Watchlist />
            // </ProtuctedRoutes>
          ),
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
