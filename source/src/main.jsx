import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import ResumePreview from "./ResumePreview";
import "./styles.css";
import "./polish.css";
import "./premium.css";
import "./reference.css";
import "./reference-motion.css";

const normalizedPath = window.location.pathname.replace(/\/+$/, "");
const currentPath = normalizedPath === "/resume/index.html" ? "/resume" : normalizedPath || "/";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {currentPath === "/resume" ? <ResumePreview /> : <App />}
  </React.StrictMode>,
);
