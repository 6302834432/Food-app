import axios from 'axios';

export const getUser = () =>
  localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : null;

    export const login = async (email, password) => {
      try {
        const response = await axios.post('http://localhost:8000/api/users/login', { email, password });
        const data = response.data;
    
        localStorage.setItem('user', JSON.stringify(data));
        window.location.replace('/');
        return data;
      } catch (err) {
        const errorMessage = err.response?.data || 'An error occurred during login';
        // toast.error(errorMessage);
        throw new Error(errorMessage); 
      }
    };

export const register = async registerData => {
  const response = await axios.post('http://localhost:8000/api/users/register', registerData);
  const data=response.data
  localStorage.setItem('user', JSON.stringify(data));
  window.replace('/')
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('user');
};

// export const updateProfile = async user => {
//   const { data } = await axios.put('/api/users/updateProfile', user);
//   localStorage.setItem('user', JSON.stringify(data));
//   return data;
// };

// export const changePassword = async passwords => {
//   await axios.put('/api/users/changePassword', passwords);
// };

// export const getAll = async searchTerm => {
//   const { data } = await axios.get('/api/users/getAll/' + (searchTerm ?? ''));
//   return data;
// };

// export const toggleBlock = async userId => {
//   const { data } = await axios.put('/api/users/toggleBlock/' + userId);
//   return data;
// };

// export const getById = async userId => {
//   const { data } = await axios.get('/api/users/getById/' + userId);
//   return data;
// };

// export const updateUser = async userData => {
//   const { data } = await axios.put('/api/users/update', userData);
//   return data;
// };
