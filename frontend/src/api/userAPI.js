import api from './axiosConfig';

export const userAPI = {
  // Get user profile
  getProfile: async () => {
    const response = await api.get('/user/profile');
    return response.data;
  },

  // Update user profile
  updateProfile: async (userData) => {
    const response = await api.put('/user/profile', userData);
    return response.data;
  },

  // Change password
  changePassword: async (passwordData) => {
    const response = await api.put('/user/password', passwordData);
    return response.data;
  },

  // Upload avatar
  uploadAvatar: async (formData) => {
    const response = await api.post('/user/avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Get user applications
  getApplications: async () => {
    const response = await api.get('/user/applications');
    return response.data;
  }
}; 