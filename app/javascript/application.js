// Entry point for the build script in your package.json
import React from "react";
import App from "./components/App";

document.addEventListener("DOMContentLoaded", () => {
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(<App />);
});
