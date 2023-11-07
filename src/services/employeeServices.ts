import axios, { AxiosResponse } from 'axios';

type EmployeePayload = {
  name?: string;
  document?: string;
  team_id?: string;
};

const baseUrl = 'https://43cukk3sll.execute-api.us-east-1.amazonaws.com/dev/employee';

const api = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const getEmployees = async (): Promise<EmployeePayload[]> => {
  try {
    const response: AxiosResponse = await api.post('', {
      operation: 'get_all_employees',
      token: localStorage.getItem('Token')
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching employees:', error);
    throw error;
  }
};

export const getEmployee = async (document: string): Promise<EmployeePayload> => {
  try {
    const response: AxiosResponse = await api.post('', {
      operation: 'get_employee',
      token: localStorage.getItem('Token'),
      payload: { document }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching employee:', error);
    throw error;
  }
};

export const createEmployee = async (employee: EmployeePayload): Promise<AxiosResponse> => {
  try {
    const response: AxiosResponse = await api.post('', {
      operation: 'create_employee',
      token: localStorage.getItem('Token'),
      payload: employee
    });
    console.log(response)
    return response.data;
  } catch (error) {
    console.error('Error creating employee:', error);
    throw error;
  }
};

export const updateEmployee = async (employee: EmployeePayload): Promise<AxiosResponse> => {
  try {
    const response: AxiosResponse = await api.post('', {
      operation: 'update_employee',
      token: localStorage.getItem('Token'),
      payload: employee
    });
    return response.data;
  } catch (error) {
    console.error('Error updating employee:', error);
    throw error;
  }
};

export const deleteEmployee = async (document: string): Promise<AxiosResponse> => {
  try {
    const response: AxiosResponse = await api.post('', {
      operation: 'delete_employee',
      token: localStorage.getItem('Token'),
      payload: { document }
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting employee:', error);
    throw error;
  }
};
