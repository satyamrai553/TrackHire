import { createAsyncThunk } from '@reduxjs/toolkit';
import { userAPI } from '../../api/userAPI';
import { loginStart, loginSuccess, loginFailure, registerStart, registerSuccess, registerFailure, logout as logoutAction } from './authSlice';

// Login thunk
export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials, { dispatch }) => {
    try {
      dispatch(loginStart());
      const response = await authAPI.login(credentials);
      dispatch(loginSuccess(response));
      return response;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Login failed';
      dispatch(loginFailure(errorMessage));
      throw error;
    }
  }
);

// Register thunk
export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData, { dispatch }) => {
    try {
      dispatch(registerStart());
      const response = await userAPI.register(userData);
      dispatch(registerSuccess(response));
      return response;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Registration failed';
      dispatch(registerFailure(errorMessage));
      throw error;
    }
  }
);

// Logout thunk
export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { dispatch }) => {
    try {
      await userAPI.logout();
    } catch (error) {
      // Optionally handle error
    } finally {
      dispatch(logoutAction());
    }
  }
);

// Verify token thunk
export const verifyToken = createAsyncThunk(
  'auth/verifyToken',
  async (_, { dispatch }) => {
    try {
      const response = await userAPI.getProfile();
      dispatch({ type: 'auth/setUser', payload: response.user });
      return response;
    } catch (error) {
      dispatch({ type: 'auth/logout' });
      throw error;
    }
  }
); 