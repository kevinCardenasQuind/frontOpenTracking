import { useEffect, useState } from 'react';
import { getEmployees } from '../../../services/employeeServices';
import { getArea } from '../../../services/areaServices';

export function useEmployeeData() {
  const [employees, setEmployees] = useState([]);
  const [areaNames, setAreaNames] = useState({});

  useEffect(() => {
    async function fetchEmployees() {
      try {
        const data = await getEmployees();
        const areaNamesTemp = {};
        for (let employee of data) {
          const areaData = await getArea(employee.area_id);
          areaNamesTemp[employee.area_id] = areaData.name;
        }
        setAreaNames(areaNamesTemp);
        setEmployees(data);
      } catch (error) {
        console.error('Error fetching employees or areas:', error);
      }
    }

    fetchEmployees();
  }, []);

  const handleDeleted = (deletedEmployee) => {
    setEmployees(employees.filter(employee => employee.cedula !== deletedEmployee.cedula));
  };

  return { employees, areaNames, handleDeleted };
}