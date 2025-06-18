import api from '../../api/authAPI'; 

const adminService = {
  /**
   * Fetch dashboard statistics
   * @returns {Promise<Object>} Dashboard stats
   */
  getStats: async () => {
    try {
      const response = await api.get('/admin/dashboard');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch dashboard stats');
    }
  },

  /**
   * User Management
   */
  getUsers: async (params = { page: 1, limit: 10 }) => {
    try {
      const response = await api.get('/admin/users', { params });
      return {
        users: response.data.users,
        pagination: response.data.pagination
      };
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch users');
    }
  },

  getUserById: async (userId) => {
    try {
      const response = await api.get(`/admin/users/${userId}`);
      return response.data.user;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch user');
    }
  },

  updateUserRole: async ({ userId, role }) => {
    try {
      const response = await api.patch(`/admin/users/${userId}/role`, { role });
      return response.data.user;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update user role');
    }
  },

  deleteUser: async (userId) => {
    try {
      await api.delete(`/admin/users/${userId}`);
      return userId;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to delete user');
    }
  },

  /**
   * Job Management
   */
  getAllJobs: async (params = { status: 'all', page: 1 }) => {
    try {
      const response = await api.get('/admin/jobs', { params });
      return {
        jobs: response.data.jobs,
        pagination: response.data.pagination
      };
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch jobs');
    }
  },

  getJobById: async (jobId) => {
    try {
      const response = await api.get(`/admin/jobs/${jobId}`);
      return response.data.job;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch job');
    }
  },

  createJob: async (jobData) => {
    try {
      const response = await api.post('/admin/jobs', jobData);
      return response.data.job;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to create job');
    }
  },

  updateJob: async ({ jobId, ...jobData }) => {
    try {
      const response = await api.patch(`/admin/jobs/${jobId}`, jobData);
      return response.data.job;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update job');
    }
  },

  updateJobStatus: async ({ jobId, status }) => {
    try {
      const response = await api.patch(`/admin/jobs/${jobId}/status`, { status });
      return response.data.job;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update job status');
    }
  },

  deleteJob: async (jobId) => {
    try {
      await api.delete(`/admin/jobs/${jobId}`);
      return jobId;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to delete job');
    }
  },

  /**
   * Job Applications Management
   */
  getApplications: async (params = { status: 'pending', page: 1 }) => {
    try {
      const response = await api.get('/admin/applications', { params });
      return {
        applications: response.data.applications,
        pagination: response.data.pagination
      };
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch applications');
    }
  },

  updateApplicationStatus: async ({ applicationId, status }) => {
    try {
      const response = await api.patch(
        `/admin/applications/${applicationId}/status`,
        { status }
      );
      return response.data.application;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update application status');
    }
  }
};

export default adminService;