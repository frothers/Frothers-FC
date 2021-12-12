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
  scorers: any[]
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

export type resultData = {
  date: Date,
  season: string,
  team: string,
  result: string
};

export type matchGoalsData = {
  date: Date,
  season: string,
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

  let goalscorers: gameData[] = data.items.map((a: postData) => {
    if (a.scorers === null
      || a.match.includes("true") !== true
      || (a.friendly && a.friendly.includes("true") === true)
      || (a.draft && a.draft.includes("true") === true)) {
      return null;
    }

    let game: gameData = {
      "date": new Date(a.date),
      "season": a.season,
      "team": a.team,
      "scorers": a.scorers
    }
    return game
  }
  );

  goalscorers = goalscorers.filter((a: any) => a != null);

  return goalscorers;
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

