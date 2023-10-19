import React, { useState } from 'react';
import { createEmployee } from '../services/employeeServices';
import EmployeeForm from '../components/employees/EmployeeForm';
import EmployeeDetail from '../components/employees/EmployeeDetail';
import EmployeeDelete from '../components/employees/EmployeeDelete';
import EmployeeList from '../components/employees/EmployeeList';

function EmployeeAdminPage() {
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleEmployeeSelect = (employee) => {
    setSelectedEmployee(employee);
    setIsDeleting(false);
  };

  const handleFormSubmit = async (employee) => {
    try {
      await createEmployee(employee);
      setSelectedEmployee(null);
    } catch (error) {
      console.error('Error creating employee:', error);
    }
  };

  const handleDeleteClick = () => {
    setIsDeleting(true);
  };

  const handleEmployeeDeleted = () => {
    setSelectedEmployee(null);
    setIsDeleting(false);
  };

  return (
    <div>
      <h1>Employee Administration</h1>
      <EmployeeForm onSubmit={handleFormSubmit} />
      <EmployeeList onSelect={handleEmployeeSelect} />
      {selectedEmployee && !isDeleting && (
        <div>
          <EmployeeDetail employee={selectedEmployee} />
          <button onClick={handleDeleteClick}>Delete</button>
        </div>
      )}
      {selectedEmployee && isDeleting && (
        <EmployeeDelete
          employee={selectedEmployee}
          onDeleted={handleEmployeeDeleted}
        />
      )}
    </div>
  );
}

export default EmployeeAdminPage;
