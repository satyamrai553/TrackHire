import { createAsyncThunk } from '@reduxjs/toolkit';
import { adminAPI } from '../../api/adminAPI';
import { Status } from './adminSlice'; // Import status constants

// Helper function for consistent error handling
const handleApiError = (error) => {
  const errorMessage = error.response?.data?.message || error.message || 'Something went wrong';
  throw new Error(errorMessage);
};

// Fetch all users with pagination
export const fetchUsers = createAsyncThunk(
  'admin/fetchUsers',
  async (params = { page: 1, limit: 10 }, { rejectWithValue }) => {
    try {
      const response = await adminAPI.getUsers(params);
      return {
        data: response.data.users,
        pagination: response.data.pagination
      };
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

// Update user role
export const updateUserRole = createAsyncThunk(
  'admin/updateUserRole',
  async ({ userId, role }, { rejectWithValue }) => {
    try {
      const response = await adminAPI.updateUserRole(userId, role);
      return {
        userId,
        role: response.data.role,
        updatedUser: response.data.user
      };
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

// Delete user
export const deleteUser = createAsyncThunk(
  'admin/deleteUser',
  async (userId, { rejectWithValue }) => {
    try {
      await adminAPI.deleteUser(userId);
      return userId;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

// Fetch dashboard statistics
export const fetchDashboardStats = createAsyncThunk(
  'admin/fetchDashboardStats',
  async (_, { rejectWithValue }) => {
    try {
      const response = await adminAPI.getDashboardStats();
      return response.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

// Fetch analytics data
export const fetchAnalytics = createAsyncThunk(
  'admin/fetchAnalytics',
  async (params = { timeframe: '30d' }, { rejectWithValue }) => {
    try {
      const response = await adminAPI.getAnalytics(params);
      return response.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

// Job Management

// Get all jobs (admin view)
export const fetchAllJobs = createAsyncThunk(
  'admin/fetchAllJobs',
  async (params = { status: 'all', page: 1 }, { rejectWithValue }) => {
    try {
      const response = await adminAPI.getAllJobs(params);
      return {
        jobs: response.data.jobs,
        pagination: response.data.pagination
      };
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

// Update job status
export const updateJobStatus = createAsyncThunk(
  'admin/updateJobStatus',
  async ({ jobId, status }, { rejectWithValue }) => {
    try {
      const response = await adminAPI.updateJobStatus(jobId, status);
      return {
        jobId,
        status,
        updatedJob: response.data.job
      };
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

// Delete job
export const deleteJob = createAsyncThunk(
  'admin/deleteJob',
  async (jobId, { rejectWithValue }) => {
    try {
      await adminAPI.deleteJob(jobId);
      return jobId;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);