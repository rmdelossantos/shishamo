import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Column } from "@/types/table";

type TableViewProps<T extends Record<string, unknown>> = {
  data: T[];
  columns: Column<T>[];
};

export const TableView = <T extends Record<string, unknown>>({
  data,
  columns,
}: TableViewProps<T>) => (
  <div className="mb-8">
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((col) => (
                <TableHead key={String(col.key)} className={col.className}>
                  {col.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item, rowIndex) => (
              <TableRow key={rowIndex}>
                {columns.map((col, colIndex) => (
                  <TableCell
                    key={`${rowIndex}-${colIndex}`}
                    className={col.className}
                  >
                    {col.render ? col.render(item) : String(item[col.key])}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  </div>
);
