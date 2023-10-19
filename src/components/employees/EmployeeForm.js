import React, { useState } from 'react';
import { createEmployee } from '../../services/employeeServices';  // Importa createEmployee

function EmployeeForm({ onSubmit }) {
  const [name, setName] = useState('');
  const [cedula, setCedula] = useState('');
  const [areaId, setAreaId] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const employee = { cedula, Name: name, area_id: areaId };
    try {
      const data = await createEmployee(employee);  // Usa createEmployee
      onSubmit(data);
    } catch (error) {
      console.error('Error creating employee:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
        <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
        />
        <input
            type="text"
            placeholder="Cedula"
            value={cedula}
            onChange={(e) => setCedula(e.target.value)}
        />
        <input
            type="text"
            placeholder="Area ID"
            value={areaId}
            onChange={(e) => setAreaId(e.target.value)}
        />
        <button type="submit">Create Employee</button>
    </form>
  );
}

export default EmployeeForm;
