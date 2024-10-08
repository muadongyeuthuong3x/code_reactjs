import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { NameProvider } from "./context/NameContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
    <NameProvider>
      <App />
    </NameProvider>
  // </React.StrictMode>
);

reportWebVitals();
