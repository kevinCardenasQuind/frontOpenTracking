import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Heading, Text, Provider, defaultTheme } from '@adobe/react-spectrum';
import { getEmployee } from '../../services/employeeServices';
import { getArea } from '../../services/areaServices';
import './styles.css';

function EmployeeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [areaName, setAreaName] = useState('');

  useEffect(() => {
    async function fetchEmployee() {
      try {
        const employeeData = await getEmployee(id);
        setEmployee(employeeData);
      } catch (error) {
        console.error('Error fetching employee:', error);
      }
    }
    fetchEmployee();
  }, [id]);

  useEffect(() => {
    async function fetchAreaName() {
      if (employee) {
        try {
          const areaData = await getArea(employee.area_id);
          setAreaName(areaData.name);
        } catch (error) {
          console.error('Error fetching area name:', error);
        }
      }
    }
    fetchAreaName();
  }, [employee]);

  const onEdit = () => {
    navigate(`/employees/edit/${employee.cedula}`);
  };

  if (!employee) return null;

  return (
    <Provider theme={defaultTheme}>
      <div className="card">
        <Heading level={2}>Employee Detail</Heading>
        <div className="info">
          <Text><strong>Name:</strong> {employee.Name}</Text>
          <Text><strong>Cedula:</strong> {employee.cedula}</Text>
          <Text><strong>Area Name:</strong> {areaName}</Text>
          <Text><strong>Created At:</strong> {employee.created_at}</Text>
          <Text><strong>Updated At:</strong> {employee.updated_at}</Text>
        </div>
        <Button variant="cta" onPress={onEdit}>Edit</Button>
      </div>
    </Provider>
  );
}

export default EmployeeDetail;
