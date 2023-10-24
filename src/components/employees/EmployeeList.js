import React, { useEffect, useState } from 'react';
import { useTable } from 'react-table';
import { getEmployees } from '../../services/employeeServices';
import { Link } from 'react-router-dom';
import EmployeeDelete from './EmployeeDelete';
import { getArea } from '../../services/areaServices';

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [areaNames, setAreaNames] = useState({});

  useEffect(() => {
    async function fetchEmployees() {
      try {
        const data = await getEmployees();
        const areaNamesTemp = {};
        for (let employee of data) {
          const areaData = await getArea(employee.area_id);
          areaNamesTemp[employee.area_id] = areaData.name;
        }
        setAreaNames(areaNamesTemp);
        setEmployees(data);
      } catch (error) {
        console.error('Error fetching employees or areas:', error);
      }
    }

    fetchEmployees();
  }, []);

  const handleDeleted = (deletedEmployee) => {
    setEmployees(employees.filter(employee => employee.cedula !== deletedEmployee.cedula));
  };

  const data = React.useMemo(() => employees, [employees]);

  const columns = React.useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'Name',
      },
      {
        Header: 'Cedula',
        accessor: 'cedula',
      },
      {
        Header: 'Area',
        accessor: 'area_id',
        Cell: ({ value }) => areaNames[value] || value
      },
      {
        Header: 'Actions'
      },
    ],
    [areaNames]
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => (
                <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              ))}
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
                <EmployeeDelete employee={row.original} onDeleted={handleDeleted} />
              </td>
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

export default EmployeeList;
