import type { ReactNode } from "react";
import Button from "./button";

export type Column<T> = {
  header: string;
  accessor: keyof T;
  render?: (value: T[keyof T], row: T) => ReactNode;
};

type TableProps<T> = {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (row: T) => string | number;
  limit: number;
  skip: number;
  totalCount: number;
  onPageChange: (newSkip: number) => void;
};

function Table<T extends object>({
  columns,
  data = [],
  keyExtractor,
  limit,
  skip,
  totalCount,
  onPageChange,
}: TableProps<T>) {
  const totalPages = Math.ceil(totalCount / limit);
  const currentPage = Math.floor(skip / limit) + 1;

  return (
    <div className="w-full">
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-800 text-white">
          <tr>
            {columns.map((col) => (
              <th key={col.header} className="text-left py-3 px-4">
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
                  <td key={String(col.accessor)} className="py-3 px-4 space-x-2">
                    {col.render ? col.render(cellValue, row) : (cellValue as ReactNode)}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>

      {totalPages > 1 && (
        <div className="mt-4 flex justify-between items-center">
          <Button 
            color="gray" 
            label="Previous" 
            onClick={() => onPageChange(Math.max(0, skip - limit))}
            type="button"
            disabled={skip === 0}
          />
          <span className="text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <Button 
            color="gray" 
            label="Next" 
            onClick={() => onPageChange(Math.min(skip + limit, (totalPages - 1) * limit))}
            type="button"
            disabled={skip + limit >= totalCount}
          />
        </div>
      )}
    </div>
  );
}

export default Table;
