import React, { useState, useEffect } from 'react';
import { createEmployee, updateEmployee } from '../../services/employeeServices';
import { getAreas } from '../../services/areaServices';
import EmployeeList from './EmployeeList';

function EmployeeForm({ onSubmit, initialData }) {
  const [name, setName] = useState('');
  const [cedula, setCedula] = useState('');
  const [areaId, setAreaId] = useState('');
  const [areas, setAreas] = useState([]);

  useEffect(() => {
    if (initialData) {
      setName(initialData.Name);
      setCedula(initialData.cedula);
      setAreaId(initialData.area_id);
    }

    async function fetchAreas() {
      try {
        const areaData = await getAreas();
        setAreas(areaData);
      } catch (error) {
        console.error('Error fetching areas:', error);
      }
    }

    fetchAreas();
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const employee = { cedula, Name: name, area_id: areaId };
    try {
      let data;
      if (initialData) {
        data = await updateEmployee(employee);
      } else {
        data = await createEmployee(employee);
      }
      onSubmit(data);
    } catch (error) {
      console.error(`Error ${initialData ? 'updating' : 'creating'} employee:`, error);
    }
    window.location.reload(EmployeeList);
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
      <select
        value={areaId}
        onChange={(e) => setAreaId(e.target.value)}
      >
        <option value="" disabled>Select Area</option>
        {areas.map(area => (
          <option key={area.id} value={area.id}>{area.name}</option>
        ))}
      </select>
      <button type="submit">{initialData ? 'Update Employee' : 'Create Employee'}</button>
    </form>
  );
}

export default EmployeeForm;
