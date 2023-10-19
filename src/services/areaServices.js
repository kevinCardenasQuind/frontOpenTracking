import axios from 'axios';
import { getToken } from './authService';

const api = axios.create({
    baseURL: 'http://localhost:3000/dev/area',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`
    }
});

const getAuthHeaders = () => {
    console.log('getToken():', getToken());
    return {
        'Authorization': `Bearer ${getToken()}`
    };
};

export const createArea = async (name) => {
    try {
        const response = await api.post('', {
            operation: 'create_area',
            payload: {
                name: name,
            }
        }, {
            headers: getAuthHeaders()
        });
        return response.data;
    } catch (error) {
        console.error('Error creating area:', error);
        throw error;
    }
};

export const updateArea = async (id, name) => {
    try {
        const response = await api.post('', {
            operation: 'update_area',
            payload: {
                id: id,
                name: name,
            }
        }, {
            headers: getAuthHeaders()
        });
        return response.data;
    } catch (error) {
        console.error('Error updating area:', error);
        throw error;
    }
};

export const deleteArea = async (id) => {
    try {
        const response = await api.post('', {
            operation: 'delete_area',
            payload: { id }
        }, {
            headers: getAuthHeaders()
        });
        return response.data;
    } catch (error) {
        console.error('Error deleting area:', error);
        throw error;
    }
};

export const getAreas = async () => {
    try {
        const response = await api.post('', {
            operation: 'list_areas',
            payload: {}
        });
        console.log('response:', response)
        if (response.status !== 200) {
            throw new Error('Failed to fetch areas');
        }
        return response.data;
    } catch (error) {
        console.error('Error fetching areas:', error);
        throw error;
    }
};
