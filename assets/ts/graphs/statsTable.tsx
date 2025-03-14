import { useMemo } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import { createTheme, ThemeProvider, useTheme } from "@mui/material";

//example data type
type Frother = {
  name: string;
  url: string;
  appearances: number;
  goals: number;
};

//nested data is ok, see accessorKeys in ColumnDef below
const data: Frother[] = [
  {
    name: 'Chris',
    url: 'chris',
    appearances: 114,
    goals: 15
  },
  {
    name: 'Lance',
    url: 'lance',
    appearances: 114,
    goals: 60
  },
  {
    name: 'Yarride',
    url: 'yarride',
    appearances: 114,
    goals: 60
  },
];

const StatsTable = () => {
  const tableTheme = useMemo(
    () =>
      createTheme({
        cssVariables: true,
        palette: {
          background: {
            default: "#132F6C",
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
      <MaterialReactTable columns={columns} data={data} />
    </ThemeProvider>
  );
};

export default StatsTable;
