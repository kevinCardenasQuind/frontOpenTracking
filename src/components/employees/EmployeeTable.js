import React from "react";
import { useTable, useFilters } from "react-table";
import { Link } from "react-router-dom";
import EmployeeDelete from "./EmployeeDelete";

function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter },
}) {
  const count = preFilteredRows.length;

  return (
    <input
      value={filterValue || ""}
      onChange={(e) => {
        setFilter(e.target.value || undefined);
      }}
      placeholder={`Search ${count} records...`}
    />
  );
}

function SelectColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id },
  areaNames,
}) {
  const options = React.useMemo(() => {
    const optionsSet = new Set();
    preFilteredRows.forEach((row) => {
      optionsSet.add(row.values[id]);
    });
    return [...optionsSet.values()];
  }, [id, preFilteredRows]);

  return (
    <select
      value={filterValue || ""}
      onChange={(e) => {
        setFilter(e.target.value || undefined);
      }}
    >
      <option value="">All</option>
      {options.map((option, i) => (
        <option key={i} value={option}>
          {areaNames[option] || option}
        </option>
      ))}
    </select>
  );
}

function EmployeeTable({ employees, areaNames, onDeleted }) {
  const data = React.useMemo(() => employees, [employees]);

  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: "Name",
      },
      {
        Header: "Cedula",
        accessor: "cedula",
      },
      {
        Header: "Area",
        accessor: "area_id",
        Cell: ({ value }) => areaNames[value] || value,
        Filter: (props) => (
          <SelectColumnFilter {...props} areaNames={areaNames} />
        ),
        filter: "equals",
      },
      {
        Header: "Actions",
        Cell: ({ row }) => (
          <>
            <td>
              <Link to={`/employees/edit/${row.original.cedula}`}>
                <button>Edit</button>
              </Link>
            </td>
            <td>
              <Link to={`/employees/view/${row.original.cedula}`}>
                <button>View</button>
              </Link>
            </td>
            <td>
              <EmployeeDelete employee={row.original} onDeleted={onDeleted} />
            </td>
          </>
        ),
      },
    ],
    [areaNames, onDeleted]
  );

  const defaultColumn = React.useMemo(
    () => ({
      Filter: DefaultColumnFilter,
    }),
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data,
        defaultColumn,
      },
      useFilters
    );

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>
                {column.render("Header")}
                <div>{column.canFilter ? column.render("Filter") : null}</div>
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
              {row.cells.map((cell) => (
                <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan={7}>
            <Link to="/employees/new">
              <button>Add New Employee</button>
            </Link>
          </td>
        </tr>
      </tfoot>
    </table>
  );
}

export default EmployeeTable;
