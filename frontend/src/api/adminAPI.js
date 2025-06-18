import api from './axiosConfig';

export const adminAPI = {
  // Get all users
  getUsers: async (params = {}) => {
    const response = await api.get('/admin/users', { params });
    return response.data;
  },

  // Get user by ID
  getUser: async (id) => {
    const response = await api.get(`/admin/users/${id}`);
    return response.data;
  },

  // Update user role
  updateUserRole: async (id, role) => {
    const response = await api.put(`/admin/users/${id}/role`, { role });
    return response.data;
  },

  // Delete user
  deleteUser: async (id) => {
    const response = await api.delete(`/admin/users/${id}`);
    return response.data;
  },

  // Get admin dashboard stats
  getDashboardStats: async () => {
    const response = await api.get('/admin/dashboard/stats');
    return response.data;
  },

  // Get admin analytics
  getAnalytics: async (params = {}) => {
    const response = await api.get('/admin/analytics', { params });
    return response.data;
  },

  // Approve/reject job
  updateJobStatus: async (id, status) => {
    const response = await api.put(`/admin/jobs/${id}/status`, { status });
    return response.data;
  },

  // Get all jobs for admin
  getAllJobs: async (params = {}) => {
    const response = await api.get('/admin/jobs', { params });
    return response.data;
  }
}; 