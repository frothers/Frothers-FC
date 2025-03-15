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
        },
      }),

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
          <a href={`/profile/${row.original.url}`}>
            {renderedCellValue}
          </a>
        ),
      },
      {
        accessorKey: "appearances", //normal accessorKey
        header: "Appearances",
        size: 200,
      },
      {
        accessorKey: "goals",
        header: "Goals",
        size: 150,
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
