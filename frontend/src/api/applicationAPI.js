import api from './axiosConfig';

export const jobApplicationAPI = {
  // Create a new job application
  createApplication: async (applicationData) => {
    const response = await api.post('/job-applications', applicationData);
    return response.data;
  },

  // Get all applications for the logged-in user
  getAllApplications: async () => {
    const response = await api.get('/job-applications');
    return response.data;
  },

  // Get a single job application by ID
  getApplicationById: async (id) => {
    const response = await api.get(`/job-applications/${id}`);
    return response.data;
  },

  // Update job application status (used by admin or user)
  updateApplicationStatus: async (id, updateData) => {
    const response = await api.put(`/job-applications/${id}`, updateData);
    return response.data;
  },

  // Delete a job application
  deleteApplication: async (id) => {
    const response = await api.delete(`/job-applications/${id}`);
    return response.data;
  },
};
