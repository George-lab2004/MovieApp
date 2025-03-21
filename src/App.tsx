import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react"; // Import lazy & Suspense for code-splitting
import "./App.css";
import Layout from "./assets/Components/Layout/Layout";
import Loader from "./assets/Components/Loader/Loader";
import MoviesDetailsPage from "./assets/Pages/Details/MoviesDetailsPage";
import SeriesDetailsPage from "./assets/Pages/Details/SeriesDetailsPage";
import Movies from "./assets/Pages/Movies/MoviesPage";
import SeriessPage from "./assets/Pages/Series/SeriesPage";

// Lazy-load the Home component using dynamic import()
const Home = lazy(() => import("./assets/Pages/Home/Home"));

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
      ],
    },
  ]);

  return <RouterProvider router={routes} />;
}

export default App;
