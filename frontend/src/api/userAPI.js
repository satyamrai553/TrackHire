import api from './axiosConfig';

export const userAPI = {
  // Register new users
  register: async (userData) => {
    const response = await api.post('/users/register', userData);
    return response.data;
  },

  // Login users
  login: async (credentials) => {
    const response = await api.post('/users/login', credentials);
    return response.data;
  },

  // Refresh token
  refreshToken: async () => {
    const response = await api.post('/users/refresh-token');
    return response.data;
  },

  // Logout users
  logout: async () => {
    const response = await api.post('/users/logout');
    return response.data;
  },

  // Get current users
  getProfile: async () => {
    const response = await api.get('/users/me');
    return response.data;
  },

  // Update account details
  updateProfile: async (userData) => {
    const response = await api.patch('/users/update', userData);
    return response.data;
  },

  // Upload avatar
  uploadAvatar: async (formData) => {
    const response = await api.patch('/users/update-avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Change password
  changePassword: async (passwordData) => {
    const response = await api.post('/users/change-password', passwordData);
    return response.data;
  }
};
