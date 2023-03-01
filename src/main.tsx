import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import { store } from "./redux/store";
import App from "./App";
import PWA from "./components/pwa/PWA";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      <PWA />
    </Provider>
  </React.StrictMode>
);
