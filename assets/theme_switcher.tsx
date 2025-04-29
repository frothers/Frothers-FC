import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import Button from "react-bootstrap/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import { MaterialUISwitch } from "./ts/themeSwitcher/switch"


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
  const [isDarkMode, setIsDarkMode] = useState(getFromLS());

  function getFromLS() {
    const data = window.localStorage.getItem("theme");
    if (data !== null) {
      if (data === "dark"){
        setTheme(data);
        return true
      } else {
        return false
      }
    } else {
      return true;
    }
  }

  function setTheme(theme: string) {
    if(theme === "dark") {
      document.body.classList.replace("theme--default", "theme--dark");
    }
  }

  const toggleDarkMode = () => {
    document.body.classList.toggle("theme--default");
    document.body.classList.toggle("theme--dark");
    setIsDarkMode(!isDarkMode);
    localStorage.setItem("theme", !isDarkMode ? "dark" : "default");
  };

  return (
    <>
    <FormControlLabel
      style = {{  margin: 0}}
      control={<MaterialUISwitch sx={{ m: 1 }} />}
      onChange={toggleDarkMode}
      checked={isDarkMode}
      label=""
    />
    </>
  );
}