import { getGoalsData, getResultsData, getSquadData, getMatchGoalsData, getAppearancesData, appearanceData } from "../apiQueries";
import { yearlyAppearances } from './statsData'
import * as _ from 'lodash';

export const AllSquadName = "frothersfc";

export type chartGoalsData = {
    label: string,
    fill: boolean,
    data: matchGoals[]
};

export type chartAppearancesData = {
    label: string,
    fill: boolean,
    data: matchAppearances[]
};

export type matchGoals = {
    t: Date,
    goals: number,
    y: number
};

export type matchAppearances = {
    t: Date,
    appearance: boolean,
    y: number
};

export type cleanSheets = {
    t: Date,
    y: number
};

export type matchResult = {
    t: Date,
    points: number,
    result: string,
    y: number
};

export type historicAppearances = {
    title: string,
    appearances: yearlyAppearances[]
};

export let parsePlayerData = async function (year?: number, season?: string, squadName: string = "frothersfc") {
    let data = await getGoalsData();
    if (season) {
        data = data.filter(a => {
            if (a.season === season) {
                return true;
            }
            else {
                return false;
            }
        });
    }
    if (year) {
        let month = 0;
        if (season === "summer"){
            month = 6;
        }
        let startDate = new Date(year, month);
        let endDate   = new Date(year + 1, month);
        data = data.filter(a => {
            if (a.date > startDate && a.date < endDate) {
                return true;
            }
            else {
                return false;
            }
        });
    }
    if (squadName && squadName != AllSquadName) {
        data = data.filter(a => {
            if (a.team.toLowerCase().replace(/\s/g, '') === squadName) {
                return true;
            }
            else {
                return false;
            }
        });
    }

    let scorers = _.map(_.flatten(_.map(data, "scorers")), "scorer");
    let squadData = await getSquadData(squadName);

    scorers = scorers.concat(squadData.players);
    let scorerNames = _.uniq(scorers);

    let playerData = scorerNames.map(name => {
        let record: chartGoalsData = {
            "label": name,
            "fill": false,
            "data": []
        }
        return record;
    });

    data = data.sort((a, b) => {
        return a.date.getTime() - b.date.getTime()
    })

    // Change it from Game to Scorer for the key, then make it cumulative
    data.forEach(game => {
        scorerNames.forEach((scorer) => {
            let playerIndex = playerData.findIndex(e => e.label == scorer)
            let scorerIndex = game.scorers.findIndex(e => e.scorer == scorer)

            let lastMatch = playerData[playerIndex].data[playerData[playerIndex].data.length - 1] || { y: 0 };
            let prevTotal = lastMatch.y;

            let goals = 0;

            if (scorerIndex > -1) {
                goals = game.scorers[scorerIndex].goals
            }

            playerData[playerIndex].data.push({
                "t": game.date,
                "goals": goals,
                "y": prevTotal + goals
            })
        })
    })

    if (!year) {
        playerData.forEach((playersData, index) => {
            // Aggregate all of the goals for a year
            playerData[index].data = _.values(_.reduce(playersData.data, function (result: any, obj) {
                let year = obj.t.getFullYear();
                result[year] = {
                    t: Date.parse(year.toString()),
                    goals: obj.goals + (result[year] ? result[year].goals : 0),
                    y: obj.goals + (result[year] ? result[year].goals : 0)
                };
                return result;
            }, {}));

            // Add up
            playerData[index].data.forEach((yearGoals, index2) => {
                playerData[index].data[index2].y = yearGoals.y + (playerData[index].data[index2 - 1] ? playerData[index].data[index2 - 1].y : 0);
            })
        });
    }

    return playerData;
}

export let parseAppearancesData = async function (year?: number, season?: string, squadName: string = "frothersfc") {
    let data = await getAppearancesData();
    let temp = <HTMLCanvasElement>document.getElementById("appearances-panel");

    let dataAppearances: historicAppearances[] = JSON.parse(temp.getAttribute("data-appearances"));
    let historicData = await parseHistricAppearances(dataAppearances);

    data = data.concat(historicData);
    
    if (season) {
        data = data.filter(a => {
            if (a.season === season) {
                return true;
            }
            else {
                return false;
            }
        });
    }
    if (year) {
        let month = 0;
        if (season === "summer"){
            month = 6;
        }
        let startDate = new Date(year, month);
        let endDate   = new Date(year + 1, month);
        data = data.filter(a => {
            if (a.date > startDate && a.date < endDate) {
                return true;
            }
            else {
                return false;
            }
        });
    }
    if (squadName && squadName != AllSquadName) {
        data = data.filter(a => {
            if (a.team.toLowerCase().replace(/\s/g, '') === squadName) {
                return true;
            }
            else {
                return false;
            }
        });
    }

    let players: string[] = [];
    data.forEach(game => {
        players = players.concat(game.xi_and_subs);
    })

    let squadData = await getSquadData(squadName);

    players = players.concat(squadData.players);
    let playersNames = _.uniq(players);


    let playerData = playersNames.map(name => {
        let record: chartAppearancesData = {
            "label": name,
            "fill": false,
            "data": []
        }
        return record;
    });

    data = data.sort((a, b) => {
        return a.date.getTime() - b.date.getTime()
    })

    // Change it from Game to Scorer for the key, then make it cumulative
    data.forEach(game => {
        playersNames.forEach((player) => {
            let playerIndex = playerData.findIndex(e => e.label == player)
            let played = game.xi_and_subs.includes(player)

            let lastMatch = playerData[playerIndex].data[playerData[playerIndex].data.length - 1] || { y: 0 };
            let prevTotal = lastMatch.y;

            let newAppearances = prevTotal;
            if (played) {
                newAppearances = newAppearances + 1;
            }

            playerData[playerIndex].data.push({
                t : game.date,
                appearance: played,
                y : newAppearances
            })
        })
    })

    if (!year) {
        playerData.forEach((playersData, index) => {
            // Aggregate all of the goals for a year
            playerData[index].data = _.values(_.reduce(playersData.data, function (result: any, obj) {
                let year = obj.t.getFullYear();
                result[year] = {
                    t: Date.parse(year.toString()),
                    appearance: obj.appearance + (result[year] ? result[year].appearance : 0),
                    y: obj.appearance + (result[year] ? result[year].appearance : 0)
                };
                return result;
            }, {}));

            // Add up
            playerData[index].data.forEach((yearGoals, index2) => {
                playerData[index].data[index2].y = yearGoals.y + (playerData[index].data[index2 - 1] ? playerData[index].data[index2 - 1].y : 0);
            })
        });
    }

    return playerData;
}

export let parsePointsData = async function (year: number, season: string, squadName: string = "frothersfc") {
    let data = await getResultsData();

    if (season) {
        data = data.filter(a => {
            if (a.season === season) {
                return true;
            }
            else {
                return false;
            }
        });
    }
    if (year) {
        let month = 0;
        if (season === "summer"){
            month = 6;
        }
        let startDate = new Date(year, month);
        let endDate   = new Date(year + 1, month);
        data = data.filter(a => {
            if (a.date > startDate && a.date < endDate) {
                return true;
            }
            else {
                return false;
            }
        });
    }
    if (squadName && squadName != AllSquadName) {
        data = data.filter(a => {
            if (a.team.toLowerCase().replace(/\s/g, '') === squadName) {
                return true;
            }
            else {
                return false;
            }
        });
    }

    data = data.sort((a, b) => {
        return a.date.getTime() - b.date.getTime()
    })

    if (squadName && squadName != AllSquadName) {
        data = data.filter(a => {
            if (a.team.toLowerCase().replace(/\s/g, '') === squadName) {
                return true;
            }
            else {
                return false;
            }
        });
    }

    let resultsData: matchResult[] = [];

    data.forEach(game => {
        let lastMatch = resultsData[resultsData.length - 1] || { y: 0 };
        let prevTotal = lastMatch.y;

        let points = 0;

        if (game.result === "Win") {
            points = 3;
        }
        else if (game.result === "Draw") {
            points = 1;
        }
        else if (game.result === "Loss") {
            points = 0;
        }
        else {
            return;
        }

        resultsData.push({
            "t": game.date,
            "points": points,
            "result": game.result,
            "y": prevTotal + points
        })
    })

    return resultsData;
}

export let parseCleanSheetData = async function (year: number, season: string, squadName: string = "frothersfc") {
    let data = await getMatchGoalsData();

    data = data.sort((a, b) => {
        return a.date.getTime() - b.date.getTime()
    })

    if (season) {
        data = data.filter(a => {
            if (a.season === season) {
                return true;
            }
            else {
                return false;
            }
        });
    }
    if (year) {
        let month = 0;
        if (season === "summer"){
            month = 6;
        }
        let startDate = new Date(year, month);
        let endDate   = new Date(year + 1, month);
        data = data.filter(a => {
            if (a.date > startDate && a.date < endDate) {
                return true;
            }
            else {
                return false;
            }
        });
    }
    if (squadName && squadName != AllSquadName) {
        data = data.filter(a => {
            if (a.team.toLowerCase().replace(/\s/g, '') === squadName) {
                return true;
            }
            else {
                return false;
            }
        });
    }
    if (squadName && squadName != AllSquadName) {
        data = data.filter(a => {
            if (a.team.toLowerCase().replace(/\s/g, '') === squadName) {
                return true;
            }
            else {
                return false;
            }
        });
    }

    let resultsData: cleanSheets[] = [];

    data.forEach(game => {
        let lastMatch = resultsData[resultsData.length - 1] || { y: 0 };
        let prevTotal = lastMatch.y;

        let cs = 0;

        if (game.opponent_goals > 0) {
            cs = 0;
        }
        else {
            cs = 1;
        }

        resultsData.push({
            "t": game.date,
            "y": prevTotal + cs
        })
    })

    return resultsData;
}

let parseHistricAppearances = async function (histAppearances: historicAppearances[]){
    let appearances: appearanceData[] = [];
    histAppearances = histAppearances || [];
    histAppearances.forEach(playerAppearances => {
        playerAppearances.appearances.forEach(yearly => {
            let appearance: appearanceData = {
                date: new Date(yearly.year.toString()),
                season: "",
                team: "",
                xi_and_subs: [playerAppearances.title]
            } 
            for (let i = 0; i < yearly.appearances; i++) {
                appearances.push(appearance)
            }
        })
    })

    return appearances
}