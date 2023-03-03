import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import store from "@redux/store";
import App from "@components/App";
import ProgressiveWebApp from "@components/ProgressiveWebApp";
import ErrorBoundary from "@components/ErrorBoundary";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <ErrorBoundary>
        <App />
        <ProgressiveWebApp />
      </ErrorBoundary>
    </Provider>
  </React.StrictMode>
);
