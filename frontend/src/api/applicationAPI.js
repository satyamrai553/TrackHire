import api from './axiosConfig';

export const jobApplicationAPI = {
  // Create a new job application
  createApplication: async (applicationData) => {
    const response = await api.post('/jobApplication', applicationData);
    return response.data;
  },

  // Get all applications for the logged-in user
  getAllApplications: async () => {
    const response = await api.get('/jobApplication');
    return response.data;
  },

  // Get a single job application by ID
  getApplicationById: async (id) => {
    const response = await api.get(`/jobApplications/${id}`);
    return response.data;
  },

  // Update job application status (used by admin or user)
  updateApplicationStatus: async (id, updateData) => {
    const response = await api.put(`/jobApplication/${id}`, updateData);
    return response.data;
  },

  // Delete a job application
  deleteApplication: async (id) => {
    const response = await api.delete(`/jobApplication/${id}`);
    return response.data;
  },
};
