import React from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import App from './ts/squadbuilder/app'

window.addEventListener('load', function () {
  displayApp();
})

function displayApp() {
  const domNode = document.getElementById('app');
  const root = createRoot(domNode);

  root.render(
      <React.StrictMode>
          <p> Hello </p>
          <App />
      </React.StrictMode>
  );
}