import React from "react";
import ReactDOM from "react-dom/client";
import "./index.less";
import { BrowserRouter as Router } from "react-router-dom";
import AppRouter from "./router";
import { EntitiesProvider } from "./context/entitiesContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <EntitiesProvider>
      <Router>
        <AppRouter />
      </Router>
    </EntitiesProvider>
  </React.StrictMode>
);
