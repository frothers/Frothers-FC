import { default as axios } from 'axios';
import * as _ from 'lodash';

const postsAPI = '/posts/index.json';
const squadAPI = '/squad/index.json';

export type postData = {
  title: string,
  match: string,
  season: string,
  team: string,
  friendly: string,
  draft: string,
  date: string,
  result: string,
  frother_goals: string,
  opponent_goals: string,
  permalink: string,
  scorers: any[],
  xi: string[]
};

export type squadData = {
  players: string[],
  name: string
};

export type gameData = {
  date: Date,
  season: string,
  team: string,
  scorers: scorerData[]
};

export type appearanceData = {
  date: Date,
  season: string,
  team: string,
  xi_and_subs: string[]
};

export type resultData = {
  date: Date,
  season: string,
  team: string,
  result: string
};

export type matchGoalsData = {
  date: Date,
  season: string,
  team: string,
  frother_goals: number,
  opponent_goals: number
};

export type scorerData = {
  scorer: string,
  goals: number
};

/**
 * @summary Goal scorers graphics.
 */
export let getGoalsData = async function () {
  let response = await axios.get(postsAPI);
  let data = response.data.data;

  let filteredData: postData[] = data.items.filter((a: postData) => {
    if (a.scorers === null
      || a.match.includes("true") !== true
      || (a.friendly && a.friendly.includes("true") === true)
      || (a.draft && a.draft.includes("true") === true)) {
      return false;
    }
    return true;
  });

  let goalscorers: gameData[] = filteredData.map(a => {
    let game: gameData = {
      "date": new Date(a.date),
      "season": a.season,
      "team": a.team,
      "scorers": a.scorers
    }
    return game
  });

  return goalscorers;
};

/**
 * @summary Goal scorers graphics.
 */
 export let getAppearancesData = async function () {
  let response = await axios.get(postsAPI);
  let data = response.data.data;

  let appearances: appearanceData[] = data.items.map((a: postData) => {
    if (a.xi === null
      || a.match.includes("true") !== true
      || (a.friendly && a.friendly.includes("true") === true)
      || (a.draft && a.draft.includes("true") === true)) {
      return null;
    }

    let game: appearanceData = {
      "date": new Date(a.date),
      "season": a.season,
      "team": a.team,
      "xi_and_subs": a.xi,
    }
    return game
  }
  );

  appearances = appearances.filter((a: any) => a != null);

  return appearances;
};

/**
 * @summary Get results graphics.
 */
export let getResultsData = async function () {
  let response = await axios.get(postsAPI);
  let data = response.data.data;

  let results: resultData[] = data.items.map((a: postData) => {
    if (a.result === null
      || a.match.includes("true") !== true
      || (a.friendly && a.friendly.includes("true") === true)
      || (a.draft && a.draft.includes("true") === true)) {
      return null;
    }

    let result: resultData = {
      "date": new Date(a.date),
      "season": a.season,
      "team": a.team,
      "result": a.result
    }
    return result
  }
  );

  results = results.filter((a: any) => a != null);

  return results;
};

/**
 * @summary Get match goals graphics.
 */
export let getMatchGoalsData = async function () {
  let response = await axios.get(postsAPI);
  let data = response.data.data;

  let matchGoals: matchGoalsData[] = data.items.map((a: postData) => {
    if (a.result === null
      || a.match.includes("true") !== true
      || (a.friendly && a.friendly.includes("true") === true)
      || (a.draft && a.draft.includes("true") === true)) {
      return null;
    }

    let result: matchGoalsData = {
      date: new Date(a.date),
      season: a.season,
      "team": a.team,
      frother_goals: parseInt(a.frother_goals),
      opponent_goals: parseInt(a.opponent_goals)
    }
    return result
  }
  );

  matchGoals = matchGoals.filter((a: any) => a != null);

  return matchGoals;
};

/**
 * @summary Goal scorers graphics.
 */
export let getSquadData = async function (name: string) {
  let response = await axios.get(squadAPI);
  let data = response.data.data;

  let squad: squadData;
  data.items.forEach((element: squadData) => {
      let cleanName = element.name.toLowerCase().replace(/\s/g, '');
      if (cleanName === name){
        squad = element;
      }
  });

  return squad;
};

