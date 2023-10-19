import axios from 'axios';
import { getToken } from './authService';

const api = axios.create({
  baseURL: 'http://localhost:3000/dev/employee',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${getToken()}`
  }
});

export const createEmployee = async (employee) => {
  try {
    const response = await api.post('', {
      operation: 'create_employee',
      payload: employee
    });
    return response.data;
  } catch (error) {
    console.error('Error creating employee:', error);
    throw error;
  }
};

export const updateEmployee = async (employee) => {
  try {
    const response = await api.post('', {
      operation: 'update_employee',
      payload: employee
    });
    return response.data;
  } catch (error) {
    console.error('Error updating employee:', error);
    throw error;
  }
};

export const deleteEmployee = async (cedula) => {
  try {
    const response = await api.post('', {
      operation: 'delete_employee',
      payload: { cedula }
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting employee:', error);
    throw error;
  }
};

export const getEmployees = async () => {
  try {
    const response = await api.post('', {
      operation: 'get_all_employees',
      payload: {}
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching employees:', error);
    throw error;
  }
};

export const getEmployee = async (cedula) => {
  try {
    const response = await api.post('', {
      operation: 'get_employee',
      payload: { cedula }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching employee:', error);
    throw error;
  }
};
