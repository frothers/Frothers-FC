import { getYearSeasonFilter, updateAllGraphs } from "./ts/graphs";
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './ts/graphs2'
import { StrictMode } from 'react';

window.addEventListener('load', function () {
  displayApp();
})

function displayApp() {
  const domNode = document.getElementById('app');
  const root = createRoot(domNode);

  root.render(   <StrictMode>
    <App />
  </StrictMode>);
}