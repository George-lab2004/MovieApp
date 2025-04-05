import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { WatchList } from "./Services/EndPoints/URLS.ts";
import { WatchListProvider } from "./Context/WatchListContext.tsx";

createRoot(document.getElementById("root")!).render(
  <WatchListProvider>
    <StrictMode>
      <App />
    </StrictMode>
  </WatchListProvider>
);
