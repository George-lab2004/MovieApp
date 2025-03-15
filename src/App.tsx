import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react"; // Import lazy & Suspense for code-splitting
import "./App.css";
import Layout from "./assets/Components/Layout/Layout";
import Loader from "./assets/Components/Loader/Loader";

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
      ],
    },
  ]);

  return <RouterProvider router={routes} />;
}

export default App;
