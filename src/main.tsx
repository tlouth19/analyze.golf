import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { Analytics } from "@vercel/analytics/react";

import store from "@redux/store";
import App from "@components/App";
import ServiceWorker from "@components/ServiceWorker";
import OfflineManager from "@components/OfflineManager";
import ErrorBoundary from "@components/ErrorBoundary";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <ErrorBoundary>
        <App />
        <ServiceWorker />
        <OfflineManager />
        <Analytics />
      </ErrorBoundary>
    </Provider>
  </React.StrictMode>
);
