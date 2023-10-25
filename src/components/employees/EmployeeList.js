import React from 'react';
import EmployeeTable from './EmployeeTable';
import { useEmployeeData } from './hooks/useEmployeeData';

function EmployeeList() {
  const { employees, areaNames, handleDeleted } = useEmployeeData();

  return (
    <EmployeeTable employees={employees} areaNames={areaNames} onDeleted={handleDeleted} />
  );
}

export default EmployeeList;
