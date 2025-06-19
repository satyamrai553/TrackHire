import api from './axiosConfig';

export const adminAPI = {
  // --- USER MANAGEMENT ---

  // Get all users
  getAllUsers: async () => {
    const response = await api.get('/admin/users');
    return response.data;
  },

  // Get user by ID
  getUserById: async (userId) => {
    const response = await api.get(`/admin/users/${userId}`);
    return response.data;
  },

  // Update user role
  updateUserRole: async (userId, roleData) => {
    const response = await api.patch(`/admin/users/${userId}`, roleData);
    return response.data;
  },

  // Delete user
  deleteUser: async (userId) => {
    const response = await api.delete(`/admin/users/${userId}`);
    return response.data;
  },

  // --- JOB MANAGEMENT ---

  // Create a job
  createJob: async (jobData) => {
    const response = await api.post('/admin/jobs', jobData);
    return response.data;
  },

  // Update a job
  updateJob: async (jobId, updatedData) => {
    const response = await api.patch(`/admin/jobs/${jobId}`, updatedData);
    return response.data;
  },

  // Delete a job
  deleteJob: async (jobId) => {
    const response = await api.delete(`/admin/jobs/${jobId}`);
    return response.data;
  },
};
