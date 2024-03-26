import { ColumnDef, Row, flexRender } from "@tanstack/react-table";
import { TExames } from "./dataTable";
import { TableCell, TableRow } from "../include/ui/table";
import { tv, type VariantProps } from "tailwind-variants";
import { cn } from "@/lib/utils";

function breakLine(value: string) {
  if (value.length > 80) {
    const median = Math.floor(value.length / 2);
    return value.slice(0, median) + "\n" + value.slice(median);
  }

  if (value.length > 43) {
    return value.slice(0, 40) + "\n" + value.slice(40);
  } else {
    return value;
  }
}

export const rowVariants = tv({
  variants: {
    variant: {
      default: "bg-white text-black hover:bg-slate-50/90",
      green: "bg-green-700 text-black hover:bg-green-800",
      red: "bg-red-700 text-white hover:bg-red-800",
      yellow: "bg-yellow-400 hover:bg-yellow-500",
      purple: "bg-[#7037AC] text-white hover:bg-purple-800",
      marron: "bg-[#881337] text-white hover:bg-[#881337]/90",
      orange: "bg-orange-700 text-white hover:bg-orange-800",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

type TColour = VariantProps<typeof rowVariants>;

function coditionalColour(value: TExames) {
  let colour: TColour["variant"] = "default";
  if (value.andamento === "0") {
    colour = "green";
  } else if (value.andamento === "1") {
    colour = "red";
  } else if (value.andamento === "2") {
    colour = "yellow";
  }

  if (Number(value.tempo) >= 1440) {
    colour = "orange";
  } else if (Number(value.tempo) >= 120) {
    colour = "marron";
  } else if (Number(value.tempo) > 75) {
    colour = "purple";
  }

  return colour;
}

export function ColorfulRow({ row }: { row: Row<TExames> }) {
  const variant = coditionalColour(row.original);
  return (
    <TableRow className={cn(rowVariants({ variant }))}>
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  );
}

export const columns: ColumnDef<TExames>[] = [
  {
    accessorKey: "datadesc",
    header: () => (
      <div className="text-left uppercase font-bold text-black">data</div>
    ),
    cell: ({ row }) => (
      <div className="max-w-14">{row.getValue("datadesc")}</div>
    ),
  },
  {
    accessorKey: "protocolo",
    header: () => (
      <div className="text-left uppercase font-bold text-black">Protocolo</div>
    ),
    /*    ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Protocolo
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        );
      }, */
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("protocolo")}</div>
    ),
  },
  {
    accessorKey: "nmpaciente",
    header: () => (
      <div className="text-left uppercase font-bold text-black">Paciente</div>
    ),
    cell: ({ row }) => {
      return (
        <div className="text-left max-w-[20rem]">
          {row.getValue("nmpaciente")}
        </div>
      );
    },
  },
  {
    accessorKey: "exames",
    header: () => (
      <div className="text-left uppercase font-bold text-black">Exames</div>
    ),
    cell: ({ row }) => {
      return (
        <div className="text-left max-w-[25rem]">
          {breakLine(row.getValue("exames"))}
        </div>
      );
    },
  },
  {
    accessorKey: "andamentoexame",
    header: () => (
      <div className="text-left uppercase font-bold text-black">Andamento</div>
    ),
    cell: ({ row }) => {
      return (
        <div className="max-w-40 text-left font-medium">
          {row.getValue("andamentoexame")}
        </div>
      );
    },
  },
  {
    accessorKey: "tempo2",
    header: () => (
      <div className="text-left uppercase font-bold text-black">Tempo</div>
    ),
    cell: ({ row }) => {
      return (
        <div className="text-left font-medium">{row.getValue("tempo2")}</div>
      );
    },
  },
  {
    accessorKey: "nmdestinoresultado",
    header: () => (
      <div className="text-left uppercase font-bold text-black">Setor</div>
    ),
    cell: ({ row }) => {
      return (
        <div className="max-w-64 text-left">
          {row.getValue("nmdestinoresultado")}
        </div>
      );
    },
  },
  /*   {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <DotsHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(payment.id)}>
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  }, */
];
