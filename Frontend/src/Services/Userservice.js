import axios from 'axios';

export const getUser = () =>
  localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : null;

    export const login = async (email, password) => {
      console.log(email,password)
      try {
        const response = await axios.post('http://localhost:8000/api/users/login', { email, password });
        const data = response.data;
    
        localStorage.setItem('user', JSON.stringify(data));
        return data;
      } catch (err) {
        const errorMessage = err.response?.data || 'An error occurred during login';
        throw new Error(errorMessage); 

      }
    };

export const register = async registerData => {
  const response = await axios.post('http://localhost:8000/api/users/register', registerData);
  const data=response.data
  localStorage.setItem('user', JSON.stringify(data));
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('user');
};


export const updateProfile = async (user) => {
  try {
    const response = await axios.put('http://localhost:8000/api/users/updateProfile', user);
    
    if (response.data.success) {
      console.log(response.data.data);
    } else {
      console.error('Profile update failed:', response.data);
    }
  } catch (error) {
    console.error('Error updating profile:', error);
  }
};


export const changePassword = async passwords => {
  await axios.put('http://localhost:8000/api/users/changePassword', passwords);
};

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
