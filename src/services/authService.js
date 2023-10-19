import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/dev',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const authenticate = async (userName, password) => {
  try {
    const response = await api.post('/authenticate', {
      operation: 'authenticate_user',
      payload: {
        Name: userName,
        password: password,
      },
    });
    const token = response.data.token;
    localStorage.setItem('token', token);
    if(token){
      localStorage.setItem('Logged', true);
    }
  } catch (error) {
    console.error('Error during authentication:', error);
    throw error;
  }
};

export const getToken = () => {
  return localStorage.getItem('token');
};

export const isUserLogged = () => {
  return localStorage.getItem('Logged', true);
}
  
export const clearToken = () => {
  localStorage.removeItem('token');
};
