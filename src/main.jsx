import React from "react";
import { createRoot } from "react-dom/client";
import HearingCaseStudy from "./pages/HearingCaseStudy.jsx";
import "./styles/tokens.css";
import "./styles/global.css";
import "./styles/hearing-case-study.css";
import "./styles/reference-layout.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HearingCaseStudy />
  </React.StrictMode>,
);
