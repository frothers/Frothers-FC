import { default as axios } from "axios";
import * as _ from "lodash";

const postsAPI = "/posts/index.json";
const squadAPI = "/squad/index.json";
const squadMembersAPI = "/squad-members/index.json";

export type postData = {
  title: string;
  match: string;
  season: string;
  team: string;
  friendly: string;
  draft: string;
  date: string;
  result: "Win" | "Loss" | "Draw";
  frother_goals: string;
  opponent_goals: string;
  permalink: string;
  motm: string;
  dotd: string;
  scorers: any[];
  xi: string[];
};

export type squadData = {
  players: string[];
  name: string;
};

export type squadMemberData = {
  title: string,
  kit_number: string,
  year_joined: string,
  fut_card: string,
  mug_shot: string,
  active: string,
  position: string
};

export type gameData = {
  date: Date;
  season: string;
  team: string;
  scorers: scorerData[];
};

export type appearanceData = {
  date: Date;
  season: string;
  team: string;
  xi_and_subs: string[];
};

export type resultData = {
  date: Date;
  season: string;
  team: string;
  result: string;
};

export type matchGoalsData = {
  date: Date;
  season: string;
  team: string;
  frother_goals: number;
  opponent_goals: number;
  result: "Win" | "Loss" | "Draw";
  xi_and_subs: string[];
};

export type OTDData = {
  date: Date;
  season: string;
  team: string;
  motm: string;
  dotd: string;
};

export type scorerData = {
  scorer: string;
  goals: number;
};

/**
 * @summary Goal scorers graphics.
 */
export let getGoalsData = async function () {
  let response = await axios.get(postsAPI);
  let data = response.data.data;

  let filteredData: postData[] = data.items.filter((a: postData) => {
    if (
      a.scorers === null ||
      a.match.includes("true") !== true ||
      (a.friendly && a.friendly.includes("true") === true) ||
      (a.draft && a.draft.includes("true") === true)
    ) {
      return false;
    }
    return true;
  });

  let goalscorers: gameData[] = filteredData.map((a) => {
    let date = a.date.replace(/-/g, "/");
    let game: gameData = {
      date: new Date(date),
      season: a.season,
      team: a.team,
      scorers: a.scorers,
    };
    return game;
  });

  return goalscorers;
};

/**
 * @summary Appearances graphics.
 */
export let getAppearancesData = async function () {
  let response = await axios.get(postsAPI);
  let data = response.data.data;

  let appearances: appearanceData[] = data.items.map((a: postData) => {
    if (
      a.xi === null ||
      a.match.includes("true") !== true ||
      (a.friendly && a.friendly.includes("true") === true) ||
      (a.draft && a.draft.includes("true") === true)
    ) {
      return null;
    }
    let date = a.date.replace(/-/g, "/");
    let game: appearanceData = {
      date: new Date(date),
      season: a.season,
      team: a.team,
      xi_and_subs: a.xi,
    };
    return game;
  });

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
    if (
      a.result === null ||
      a.match.includes("true") !== true ||
      (a.friendly && a.friendly.includes("true") === true) ||
      (a.draft && a.draft.includes("true") === true)
    ) {
      return null;
    }
    let date = a.date.replace(/-/g, "/");
    let result: resultData = {
      date: new Date(date),
      season: a.season,
      team: a.team,
      result: a.result,
    };
    return result;
  });

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
    if (
      a.result === null ||
      a.match.includes("true") !== true ||
      (a.friendly && a.friendly.includes("true") === true) ||
      (a.draft && a.draft.includes("true") === true)
    ) {
      return null;
    }
    let date = a.date.replace(/-/g, "/");
    let result: matchGoalsData = {
      date: new Date(date),
      season: a.season,
      team: a.team,
      result: a.result,
      frother_goals: parseInt(a.frother_goals),
      opponent_goals: parseInt(a.opponent_goals),
      xi_and_subs: a.xi,
    };
    return result;
  });

  matchGoals = matchGoals.filter((a: any) => a != null);

  return matchGoals;
};


/**
 * @summary Get data for Motm and DotD.
 */
export let getOTDData = async function () {
  let response = await axios.get(postsAPI);
  let data = response.data.data;

  let otd: OTDData[] = data.items.map((a: postData) => {
    if (
      a.result === null ||
      a.match.includes("true") !== true ||
      (a.friendly && a.friendly.includes("true") === true) ||
      (a.draft && a.draft.includes("true") === true)
    ) {
      return null;
    }
    let date = a.date.replace(/-/g, "/");
    let result: OTDData = {
      date: new Date(date),
      season: a.season,
      team: a.team,
      motm: a.motm,
      dotd: a.dotd,
    };
    return result;
  });

  otd = otd.filter((a: any) => a != null);

  return otd;
};


/**
 * @summary Squad info.
 */
export let getSquadData = async function (name: string) {
  let response = await axios.get(squadAPI);
  let data = response.data.data;

  let squad: squadData;
  data.items.forEach((element: squadData) => {
    let cleanName = element.name.toLowerCase().replace(/\s/g, "");
    if (cleanName === name) {
      squad = element;
    }
  });

  return squad;
};

/**
 * @summary Get Player Names and Positions
 */
export let getSquadMembersData = async function (): Promise<squadMemberData[]> {
  let response = await axios.get(squadMembersAPI);
  let data = response.data.data;
  return data.items;
};