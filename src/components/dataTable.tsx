import * as React from "react";

import { ColorfulRow, columns, rowVariants } from "./columns";

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/include/ui/table";

export type TExames = {
  id: string;
  exames: string;
  datadesc: string;
  protocolo: string;
  andamentoexame: string;
  nmpaciente: string;
  dataprescricao?: any;
  tempo: number;
  tempo2: string;
  dataprescricao2?: any;
  nmdestinoresultado: string;
  andamento: string;
};

type TDataTable = {
  data?: TExames[];
};
export function DataTableDemo({ data = [] }: TDataTable) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="w-full h-full p-1 md:p-2">
      <div className="rounded-md border">
        <Table>
          <TableHeader className="bg-slate-100 text-xs md:text-lg">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="text-xs md:text-lg">
            {table.getCoreRowModel().rows?.length ? (
              table
                .getCoreRowModel()
                .rows.map((row) => <ColorfulRow key={row.id} row={row} />)
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  sem registros
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
