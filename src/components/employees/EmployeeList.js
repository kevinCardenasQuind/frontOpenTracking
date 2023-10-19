import React, { useEffect, useState } from 'react';
import { getEmployees } from '../../services/employeeServices';

function EmployeeList({ onSelect }) {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    async function fetchEmployees() {
      try {
        const data = await getEmployees();
        setEmployees(data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    }

    fetchEmployees();
  }, []);

  return (
    <div>
      <h2>Employee List</h2>
      <ul>
        {employees.map(employee => (
          <li key={employee.cedula}>
            {employee.Name}
            <button onClick={() => onSelect(employee)}>View</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EmployeeList;
