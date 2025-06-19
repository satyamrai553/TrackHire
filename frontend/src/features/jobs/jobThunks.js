// jobThunks.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import { jobAPI } from '../../api/jobAPI';

// Get all jobs
export const fetchAllJobs = createAsyncThunk(
  'job/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const data = await jobAPI.getAllJobs();
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || 'Failed to fetch jobs');
    }
  }
);

// Get job by ID
export const fetchJobById = createAsyncThunk(
  'job/fetchById',
  async (jobId, { rejectWithValue }) => {
    try {
      const data = await jobAPI.getJobById(jobId);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || 'Failed to fetch job');
    }
  }
);
