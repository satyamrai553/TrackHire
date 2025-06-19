// userThunks.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import { userAPI } from '../../api/userAPI';

// Fetch current user profile
export const fetchUserProfile = createAsyncThunk(
  'user/fetchProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await userAPI.getProfile();
      return response.user || response;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || 'Failed to fetch profile');
    }
  }
);

// Update user profile
export const updateUserProfile = createAsyncThunk(
  'user/updateProfile',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await userAPI.updateProfile(userData);
      return response.user || response;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || 'Profile update failed');
    }
  }
);

// Change user password
export const changeUserPassword = createAsyncThunk(
  'user/changePassword',
  async (passwordData, { rejectWithValue }) => {
    try {
      const response = await userAPI.changePassword(passwordData);
      return response.message || response;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || 'Password change failed');
    }
  }
);

// Upload avatar
export const uploadUserAvatar = createAsyncThunk(
  'user/uploadAvatar',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await userAPI.uploadAvatar(formData);
      return response.user || response;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || 'Avatar upload failed');
    }
  }
);
