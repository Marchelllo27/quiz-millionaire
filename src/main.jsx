import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.jsx";
import GameContextProvider from "./store/GameContextProvider";
import "./index.css";
import MusicContextProvider from "./store/MusicContextProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GameContextProvider>
      <MusicContextProvider>
        <App />
      </MusicContextProvider>
    </GameContextProvider>
  </React.StrictMode>
);
