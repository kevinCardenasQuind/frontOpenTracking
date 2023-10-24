import React, { useState } from 'react';
import EmployeeDetail from '../components/employees/EmployeeDetail';
import EmployeeDelete from '../components/employees/EmployeeDelete';
import EmployeeList from '../components/employees/EmployeeList';
import { Provider, defaultTheme, Flex } from '@adobe/react-spectrum';

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

  const handleDeleteClick = () => {
    setIsDeleting(true);
  };

  const handleEmployeeDeleted = () => {
    setSelectedEmployee(null);
    setIsDeleting(false);
  };

  return (
    <Provider theme={defaultTheme}>
      <Flex direction="column" gap="size-100" padding="size-200">
        <h1>Employee Administration</h1>
        <EmployeeList onSelect={handleEmployeeSelect} />
        {selectedEmployee && !isDeleting && !isEditing && (
          <EmployeeDetail employee={selectedEmployee} onEdit={handleEditClick} onDelete={handleDeleteClick} />
        )}
        {selectedEmployee && isDeleting && (
          <EmployeeDelete
            employee={selectedEmployee}
            onDeleted={handleEmployeeDeleted}
          />
        )}
      </Flex>
    </Provider>
  );
}

export default EmployeeAdminPage;
