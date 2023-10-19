import React from 'react';

function EmployeeDetail({ employee }) {
  return (
    <div>
      <h2>Employee Detail</h2>
      <p>Name: {employee.Name}</p>
      <p>Cedula: {employee.cedula}</p>
      <p>Area ID: {employee.area_id}</p>
    </div>
  );
}

export default EmployeeDetail;
