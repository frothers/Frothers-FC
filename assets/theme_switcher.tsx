import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import Button from "react-bootstrap/Button";

window.addEventListener("load", function () {
  displayApp();
});

function displayApp() {
  const domNode = document.getElementById("toggle");
  const root = createRoot(domNode);

  root.render(
    <StrictMode>
      <Toggle />
    </StrictMode>
  );
}

function Toggle() {
  const [isDarkMode, setIsDarkMode] = useState(false);  

  const toggleDarkMode = () => {
    document.body.classList.toggle("theme--default");
    document.body.classList.toggle("theme--dark");
    console.log("Toggle");
    setIsDarkMode(!isDarkMode);
  };

  return (
    <Button className={isDarkMode ? "light-theme-button" : "dark-theme-button"} variant="primary" size="lg" active onClick={toggleDarkMode}>
      Theme
    </Button>
  );
}
