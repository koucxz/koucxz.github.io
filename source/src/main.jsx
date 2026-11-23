import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import ResumePreview from "./ResumePreview";
import { ROUTE } from "./locale";
import "./styles.css";
import "./polish.css";
import "./premium.css";
import "./reference.css";
import "./reference-motion.css";

// 语言由 /en 前缀决定，路由由 /resume 决定，两者在 locale.js 里统一判定
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {ROUTE.view === "resume" ? <ResumePreview /> : <App />}
  </React.StrictMode>,
);
