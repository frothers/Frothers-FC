import { getAppearancesData } from "../apiQueries";
import * as _ from 'lodash';

export type appearance = {
    year: number,
    appeared: boolean
};

export type yearlyAppearances = { 
    year: number;
    appearances: number;
}

export let getPlayerAppearances = async function (name: string) {
    let data = await getAppearancesData();

    let appearancesData = data.map(match => {
        let appearance =  {
            appeared: match.xi_and_subs.includes(name),
            date: match.date.getFullYear()
        }

        return appearance;
    });

    appearancesData = appearancesData.filter(match => {
        return match.appeared;
    })

    let obj = _.countBy(appearancesData, (rec) => {
        return rec.date;
    });

    let yearlyAppearances: yearlyAppearances[] = [];

    for (const [key, value] of Object.entries(obj)) {
        yearlyAppearances.push({
            year: parseInt(key),
            appearances: value
        })
    }

    return yearlyAppearances;
}