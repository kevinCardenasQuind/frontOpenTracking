import axios from 'axios';

const authService = {
  authenticate: async (username: string, password: string): Promise<string> => {
    try {
      console.log(process.env.REACT_APP_API_BASE_URL);
      const response = await axios.post(`https://43cukk3sll.execute-api.us-east-1.amazonaws.com/dev/user`, {
        operation: 'authenticate_user',
        payload: {
          Name: username,
          password: password,
        },
      });
      if (response.status === 200) {
        return response.data.token;
      }
      throw new Error('Unauthorized');
    } catch (error) {
      throw error;
    }
  },

  logout: () => {
    localStorage.setItem('isLoggedIn', 'false');
  }
};

export default authService;
