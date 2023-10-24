import React, { useState, useEffect } from 'react';
import { createEmployee, updateEmployee, getEmployee } from '../../services/employeeServices';
import { getAreas } from '../../services/areaServices';
import { useParams } from 'react-router-dom';
import { TextField, Button, Form, Provider, defaultTheme } from '@adobe/react-spectrum';

function EmployeeForm() {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [cedula, setCedula] = useState('');
  const [areaId, setAreaId] = useState('');
  const [areas, setAreas] = useState([]);

  useEffect(() => {
    async function fetchEmployeeAndAreas() {
      try {
        const areaData = await getAreas();
        setAreas(areaData);
        if (id) {
          const employeeData = await getEmployee(id);
          setName(employeeData.Name);
          setCedula(employeeData.cedula);
          setAreaId(employeeData.area_id);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchEmployeeAndAreas();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const employee = { cedula, Name: name, area_id: areaId };
    try {
      if (id) {
        await updateEmployee(employee);
      } else {
        await createEmployee(employee);
      }
    } catch (error) {
      console.error(`Error ${id ? 'updating' : 'creating'} employee:`, error);
    }
    window.location.reload();
  };

  return (
    <Provider theme={defaultTheme}>
      <Form onSubmit={handleSubmit} maxWidth="size-4800">
        <TextField
          label="Name"
          value={name}
          onChange={setName}
        />
        <TextField
          label="Cedula"
          value={cedula}
          onChange={setCedula}
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
        <Button type="submit" variant="cta">
          {id ? 'Update Employee' : 'Create Employee'}
        </Button>
      </Form>
    </Provider>
  );
}

export default EmployeeForm;
