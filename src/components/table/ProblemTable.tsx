import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
  flexRender,
  getFilteredRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";

import { RouterOutputs } from "~/utils/api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useState } from "react";
import { Input } from "../ui/input";
import { fuzzyFilter } from "~/lib/utils";
import { Button } from "../ui/button";
import Tags from "./Tags";

type Problem = RouterOutputs["problem"]["allProblems"][number];

const columnHelper = createColumnHelper<Problem>();

const columns = [
  columnHelper.accessor("id", {
    header: "Id",
    cell: (row) => (
      <a
        href={`https://open.kattis.com/problems/${row.getValue()}`}
        target="_blank"
      >
        {row.getValue()}
      </a>
    ),
  }),
  columnHelper.accessor("title", {
    header: "Title",
  }),
  columnHelper.accessor("difficulty", {
    header: "Difficulty",
  }),
  columnHelper.accessor("tags", {
    header: "Tags",
    cell: (row) => <Tags tags={row.getValue()} />,
  }),
];

const ProblemTable = ({ data }: { data: Problem[] }) => {
  const [globalFilter, setGlobalFilter] = useState<string>("");

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    state: {
      globalFilter,
    },
  });

  return (
    <>
      <Input
        className="mb-4 w-1/2"
        placeholder="Search all problems..."
        value={globalFilter}
        onChange={(e) => setGlobalFilter(e.target.value)}
      />
      <div className="rounded-md border">
        <Table>
          <TableHeader className="bg-gray-100">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default ProblemTable;
