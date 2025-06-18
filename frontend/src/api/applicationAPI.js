import api from './axiosConfig';

export const applicationAPI = {
  // Get all applications (for admin)
  getApplications: async (params = {}) => {
    const response = await api.get('/applications', { params });
    return response.data;
  },

  // Get application by ID
  getApplication: async (id) => {
    const response = await api.get(`/applications/${id}`);
    return response.data;
  },

  // Create new application
  createApplication: async (applicationData) => {
    const response = await api.post('/applications', applicationData);
    return response.data;
  },

  // Update application status
  updateApplicationStatus: async (id, status) => {
    const response = await api.put(`/applications/${id}/status`, { status });
    return response.data;
  },

  // Delete application
  deleteApplication: async (id) => {
    const response = await api.delete(`/applications/${id}`);
    return response.data;
  },

  // Get applications for a specific job
  getJobApplications: async (jobId) => {
    const response = await api.get(`/jobs/${jobId}/applications`);
    return response.data;
  },

  // Upload resume
  uploadResume: async (formData) => {
    const response = await api.post('/applications/resume', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }
}; 