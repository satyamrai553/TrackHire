import { createAsyncThunk } from '@reduxjs/toolkit';
import { adminAPI } from '../../api/adminAPI';
import {
  fetchUsersStart,
  fetchUsersSuccess,
  fetchUsersFailure,
  updateUserRoleStart,
  updateUserRoleSuccess,
  updateUserRoleFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  fetchDashboardStatsStart,
  fetchDashboardStatsSuccess,
  fetchDashboardStatsFailure,
  fetchAnalyticsStart,
  fetchAnalyticsSuccess,
  fetchAnalyticsFailure,
} from './adminSlice';

// Fetch all users
export const fetchUsers = createAsyncThunk(
  'admin/fetchUsers',
  async (params, { dispatch }) => {
    try {
      dispatch(fetchUsersStart());
      const response = await adminAPI.getUsers(params);
      dispatch(fetchUsersSuccess(response));
      return response;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch users';
      dispatch(fetchUsersFailure(errorMessage));
      throw error;
    }
  }
);

// Update user role
export const updateUserRole = createAsyncThunk(
  'admin/updateUserRole',
  async ({ id, role }, { dispatch }) => {
    try {
      dispatch(updateUserRoleStart());
      await adminAPI.updateUserRole(id, role);
      dispatch(updateUserRoleSuccess({ id, role }));
      return { id, role };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to update user role';
      dispatch(updateUserRoleFailure(errorMessage));
      throw error;
    }
  }
);

// Delete user
export const deleteUser = createAsyncThunk(
  'admin/deleteUser',
  async (id, { dispatch }) => {
    try {
      dispatch(deleteUserStart());
      await adminAPI.deleteUser(id);
      dispatch(deleteUserSuccess(id));
      return id;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to delete user';
      dispatch(deleteUserFailure(errorMessage));
      throw error;
    }
  }
);

// Fetch dashboard stats
export const fetchDashboardStats = createAsyncThunk(
  'admin/fetchDashboardStats',
  async (_, { dispatch }) => {
    try {
      dispatch(fetchDashboardStatsStart());
      const response = await adminAPI.getDashboardStats();
      dispatch(fetchDashboardStatsSuccess(response));
      return response;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch dashboard stats';
      dispatch(fetchDashboardStatsFailure(errorMessage));
      throw error;
    }
  }
);

// Fetch analytics
export const fetchAnalytics = createAsyncThunk(
  'admin/fetchAnalytics',
  async (params, { dispatch }) => {
    try {
      dispatch(fetchAnalyticsStart());
      const response = await adminAPI.getAnalytics(params);
      dispatch(fetchAnalyticsSuccess(response));
      return response;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch analytics';
      dispatch(fetchAnalyticsFailure(errorMessage));
      throw error;
    }
  }
);

// Update job status (approve/reject)
export const updateJobStatus = createAsyncThunk(
  'admin/updateJobStatus',
  async ({ id, status }) => {
    try {
      const response = await adminAPI.updateJobStatus(id, status);
      return response;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to update job status';
      throw new Error(errorMessage);
    }
  }
);

// Get all jobs for admin
export const getAllJobs = createAsyncThunk(
  'admin/getAllJobs',
  async (params) => {
    try {
      const response = await adminAPI.getAllJobs(params);
      return response;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch jobs';
      throw new Error(errorMessage);
    }
  }
); 