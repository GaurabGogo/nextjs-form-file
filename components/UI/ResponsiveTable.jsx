import React from "react";
import { useTable } from "react-table";

const ResponsiveTable = ({ columns, data }) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  // Define the width classes array for desktop view
  const widthClasses = [
    "w-[5%] md:w-[5%]",
    "w-[50%] md:w-[50%]",
    "w-[15%] md:w-[15%]",
    "w-[15%] md:w-[15%]",
    "w-[15%] md:w-[15%]",
  ];

  // Define alignment classes for each column
  const alignmentClasses = [
    "text-center", // Center align the 1st column
    "", // Default alignment for the 2nd column
    "text-center", // Center align the 3rd column
    "text-center", // Center align the 4th column
    "text-center", // Center align the 5th column
  ];

  return (
    <div className="responsive-table-container">
      <table {...getTableProps()} className="w-full border-collapse">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, index) => (
                <th
                  {...column.getHeaderProps()}
                  className={`p-2 border border-gray-300 bg-gray-200 ${widthClasses[index]} ${alignmentClasses[index]}`}
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell, index) => (
                  <td
                    {...cell.getCellProps()}
                    data-label={cell.column.render("Header")}
                    className={`p-2 border border-gray-300 ${
                      index === 0 ? "font-bold" : ""
                    } ${widthClasses[index]} ${alignmentClasses[index]}`}
                  >
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>

      <style jsx>{``}</style>
    </div>
  );
};

export default ResponsiveTable;
