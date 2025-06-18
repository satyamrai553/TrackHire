import { createAsyncThunk } from '@reduxjs/toolkit';
import { userAPI } from '../../api/userAPI';
import {
  fetchProfileStart,
  fetchProfileSuccess,
  fetchProfileFailure,
  updateProfileStart,
  updateProfileSuccess,
  updateProfileFailure,
  fetchApplicationsStart,
  fetchApplicationsSuccess,
  fetchApplicationsFailure,
} from './userSlice';

// Fetch user profile
export const fetchUserProfile = createAsyncThunk(
  'user/fetchProfile',
  async (_, { dispatch }) => {
    try {
      dispatch(fetchProfileStart());
      const response = await userAPI.getProfile();
      dispatch(fetchProfileSuccess(response));
      return response;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch profile';
      dispatch(fetchProfileFailure(errorMessage));
      throw error;
    }
  }
);

// Update user profile
export const updateUserProfile = createAsyncThunk(
  'user/updateProfile',
  async (userData, { dispatch }) => {
    try {
      dispatch(updateProfileStart());
      const response = await userAPI.updateProfile(userData);
      dispatch(updateProfileSuccess(response));
      return response;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to update profile';
      dispatch(updateProfileFailure(errorMessage));
      throw error;
    }
  }
);

// Change password
export const changePassword = createAsyncThunk(
  'user/changePassword',
  async (passwordData, { dispatch }) => {
    try {
      const response = await userAPI.changePassword(passwordData);
      return response;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to change password';
      throw new Error(errorMessage);
    }
  }
);

// Upload avatar
export const uploadAvatar = createAsyncThunk(
  'user/uploadAvatar',
  async (formData, { dispatch }) => {
    try {
      const response = await userAPI.uploadAvatar(formData);
      // Refresh profile after avatar upload
      dispatch(fetchUserProfile());
      return response;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to upload avatar';
      throw new Error(errorMessage);
    }
  }
);

// Fetch user applications
export const fetchUserApplications = createAsyncThunk(
  'user/fetchApplications',
  async (_, { dispatch }) => {
    try {
      dispatch(fetchApplicationsStart());
      const response = await userAPI.getApplications();
      dispatch(fetchApplicationsSuccess(response));
      return response;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch applications';
      dispatch(fetchApplicationsFailure(errorMessage));
      throw error;
    }
  }
); 