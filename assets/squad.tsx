import { createRoot } from 'react-dom/client';
import YearlyStatsGraph from './ts/yearlystatsgraph'
import LifetimeStats from "./ts/lifetimestats";
import { StrictMode } from 'react';


window.addEventListener('load', function () {
  displayApp();
})

function displayApp() {
  const domNode = document.getElementById('app');
  const domNode2 = document.getElementById('lifetime-stats');
  const root = createRoot(domNode);
  const root2 = createRoot(domNode2);
  const name = domNode2.getAttribute('data-name');
  const kit = parseInt(domNode2.getAttribute('data-kit'));
  const years = parseInt(domNode2.getAttribute('data-years'));

  root.render(<StrictMode>
    <YearlyStatsGraph name={name} />
  </StrictMode>);

  root2.render(<StrictMode>
    <LifetimeStats name={name} kitNumber={kit} yearJoined={years} />
  </StrictMode>);
}