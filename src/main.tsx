import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import { store } from "./redux/store";
import App from "./App";
import ProgressiveWebApp from "./components/progressiveWebApp/ProgressiveWebApp";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      <ProgressiveWebApp />
    </Provider>
  </React.StrictMode>
);
