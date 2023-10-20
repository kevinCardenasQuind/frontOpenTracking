import React from 'react';
import { deleteEmployee } from '../../services/employeeServices';

function EmployeeDelete({ employee, onDeleted }) {
  const handleDelete = async () => {
    try {
      await deleteEmployee(employee.cedula);
      onDeleted(employee);
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
    window.location.reload();
  };

  return (
    <div>
      <h2>Delete Employee</h2>
      <p>Are you sure you want to delete {employee.Name}?</p>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default EmployeeDelete;
