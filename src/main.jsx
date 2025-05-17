// main.jsx
import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store/store.js";

import { DD } from "./app/App.jsx";
import { HashRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <HashRouter>
        <DD />
      </HashRouter>
    </Provider>
  </StrictMode>
);
