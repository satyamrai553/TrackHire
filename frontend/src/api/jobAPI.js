import api from './axiosConfig';

export const jobAPI = {
  // Get all jobs
  getJobs: async (params = {}) => {
    const response = await api.get('/jobs', { params });
    return response.data;
  },

  // Get job by ID
  getJob: async (id) => {
    const response = await api.get(`/jobs/${id}`);
    return response.data;
  },

  // Create new job
  createJob: async (jobData) => {
    const response = await api.post('/jobs', jobData);
    return response.data;
  },

  // Update job
  updateJob: async (id, jobData) => {
    const response = await api.put(`/jobs/${id}`, jobData);
    return response.data;
  },

  // Delete job
  deleteJob: async (id) => {
    const response = await api.delete(`/jobs/${id}`);
    return response.data;
  },

  // Search jobs
  searchJobs: async (searchParams) => {
    const response = await api.get('/jobs/search', { params: searchParams });
    return response.data;
  },

  // Get job categories
  getCategories: async () => {
    const response = await api.get('/jobs/categories');
    return response.data;
  }
}; 