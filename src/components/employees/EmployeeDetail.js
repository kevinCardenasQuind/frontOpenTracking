import moment from 'moment';
import React from 'react';

function EmployeeDetail({ employee, onEdit }) {
  return (
    <div>
      <h2>Employee Detail</h2>
      <p>Name: {employee.Name}</p>
      <p>Cedula: {employee.cedula}</p>
      <p>Area ID: {employee.area_id}</p>
      <p>Created At: {moment(employee.created_at).format('LL')}</p>
      <p>Updated At: {moment(employee.updated_at).format('LL')}</p>
      <button onClick={onEdit}>Edit</button>
    </div>
  );
}

export default EmployeeDetail;
