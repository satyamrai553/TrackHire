import api from './axiosConfig';

export const jobAPI = {
  // Get all jobs (requires auth)
  getAllJobs: async () => {
    const response = await api.get('/jobs');
    return response.data;
  },

  // Get a single job by ID (requires auth)
  getJobById: async (jobId) => {
    const response = await api.get(`/jobs/${jobId}`);
    return response.data;
  }
};
