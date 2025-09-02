import { useMemo, useState, useEffect } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import { createTheme, ThemeProvider, useTheme } from "@mui/material";
import { Frother, getStaticsTable } from "../processors/graphData"
import { YearSeason } from "../graphs";


function StatsTable ({ season }: { season: string }) {
  const [state, setState] = useState<Frother[]>([]);
  
  let re = /(\d+)\-(\w+)\-(\w+)/;
  let output: YearSeason;
  if (season === "all") {
    output = {
      year: null,
      season: null,
      squadName: "frothersfc"
    }
  }
  else {
    let regex = re.exec(season);

    output = {
      year: parseInt(regex[1]),
      season: regex[2],
      squadName: regex[3],
    }
  }

  useEffect(() => {
    getStaticsTable(output.year, output.season, output.squadName).then(data => {
      setState(data)
    }
    );
  })

  const tableTheme = useMemo(
    () =>
      createTheme({
        cssVariables: true,
        palette: {
          background: {
            default: "#1E1A33",
          },
          text: {
            primary: "#CBD9F6",
            secondary: "#CBD9F6",
          },
          action: {
            active: "#CBD9F6",
          }
        }}),

    []
  );

  //should be memoized or stable
  const columns = useMemo<MRT_ColumnDef<Frother>[]>(
    () => [
      {
        accessorKey: "name", //access nested data with dot notation
        header: "Name",
        size: 150,
        Cell: ({ renderedCellValue, row }) => (
          <a href={`/squad-members/${row.original.url}`}>
            {renderedCellValue}
          </a>
        ),
      },
      {
        accessorKey: "appearances", //normal accessorKey
        header: "Caps",
        size: 100,
      },
      {
        accessorKey: "goals",
        header: "Goals",
        size: 100,
      },
      {
        accessorKey: "assists",
        header: "Assists",
        size: 100,
      },
      {
        accessorKey: "motm",
        header: "MotM",
        size: 100,
      },
      {
        accessorKey: "dotd",
        header: "DotD",
        size: 100,
      },
      {
        accessorKey: "wins",
        header: "Wins",
        size: 100,
      },
      {
        accessorKey: "losses",
        header: "Losses",
        size: 100,
      },
      {
        accessorKey: "cleansheet",
        header: "Cleansheets",
        size: 100,
      },
    ],
    []
  );

  return (
    <ThemeProvider theme={tableTheme}>
      <MaterialReactTable columns={columns} data={state} />
    </ThemeProvider>
  );
};

export default StatsTable;
