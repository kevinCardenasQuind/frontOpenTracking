import axios from 'axios';

const api = axios.create({
  baseURL: "https://43cukk3sll.execute-api.us-east-1.amazonaws.com/dev/team",
  headers: {
    'Content-Type': 'application/json',
  },
});

export const createTeam = async (name: string): Promise<any> => {
  try {
    const response = await api.post('', {
      operation: 'create_team',
      token: localStorage.getItem('Token'),
      payload: { name },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating team:', error);
    throw error;
  }
};

export const getTeams = async (): Promise<any> => {
  try {
    const response = await api.post('', {
      operation: 'list_teams',
      token: localStorage.getItem('Token'),
      payload: {},
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching teams:', error);
    throw error;
  }
};

export const updateTeam = async (id: string, name: string): Promise<any> => {
  try {
    const response = await api.put('', {
      operation: 'update_team',
      token: localStorage.getItem('Token'),
      payload: { id, name },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating team:', error);
    throw error;
  }
};

export const deleteTeam = async (id: string): Promise<any> => {
  try {
    const response = await api.delete('', {
      data: {
        operation: 'delete_team',
        token: localStorage.getItem('Token'),
        payload: { id },
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting team:', error);
    throw error;
  }
};
