import { getYearSeasonFilter, updateAllGraphs } from "./ts/graphs";

window.addEventListener('load', function () {
  populateAllGraphs();

  const selectElement = <HTMLInputElement>document.getElementById("yearSelect");

  if (selectElement === null) {
    return null;
  }

  selectElement.addEventListener('change', (event) => {
    populateAllGraphs();
  });
})

function populateAllGraphs() {
  let yearSeason = getYearSeasonFilter();
  updateAllGraphs(yearSeason.year, yearSeason.season, yearSeason.squadName);
}