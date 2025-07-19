import type { ReactNode } from "react";

export type Column<T> = {
  header: string;
  accessor: keyof T;
  render?: (value: T[keyof T], row: T) => ReactNode;
};

type TableProps<T> = {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (row: T) => string | number;
};

function Table<T extends object>({ columns, data, keyExtractor }: TableProps<T>) {
  return (
    <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
      <thead className="bg-gray-800 text-white">
        <tr>
          {columns.map((col) => (
            <th
              key={col.header}
              className="text-left py-3 px-4"
            >
              {col.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={keyExtractor(row)} className="border-b hover:bg-blue-100">
            {columns.map((col) => {
              const cellValue = row[col.accessor];
              return (
                <td
                  key={String(col.accessor)}
                  className="py-3 px-4 space-x-2"
                >
                  {col.render ? col.render(cellValue, row) : (cellValue as ReactNode)}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
