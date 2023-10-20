import React, { useState } from 'react';
import EmployeeForm from '../components/employees/EmployeeForm';
import EmployeeDetail from '../components/employees/EmployeeDetail';
import EmployeeDelete from '../components/employees/EmployeeDelete';
import EmployeeList from '../components/employees/EmployeeList';
import { createEmployee, updateEmployee } from '../services/employeeServices';

function EmployeeAdminPage() {
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleEmployeeSelect = (employee) => {
    setSelectedEmployee(employee);
    setIsDeleting(false);
    setIsEditing(false);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleFormSubmit = async (employee) => {
    try {
      if (isEditing) {
        await updateEmployee(employee);
      } else {
        await createEmployee(employee);
      }
      setSelectedEmployee(null);
      setIsEditing(false);
    } catch (error) {
      console.error(`Error ${isEditing ? 'updating' : 'creating'} employee:`, error);
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
      <EmployeeForm
        onSubmit={handleFormSubmit}
        initialData={isEditing ? selectedEmployee : null}
      />
      <EmployeeList onSelect={handleEmployeeSelect} />
      {selectedEmployee && !isDeleting && !isEditing && (
        <div>
          <EmployeeDetail employee={selectedEmployee} onEdit={handleEditClick} />
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
