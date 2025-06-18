import { createAsyncThunk } from '@reduxjs/toolkit';
import { applicationAPI } from '../../api/applicationAPI';
import {
  fetchApplicationsStart,
  fetchApplicationsSuccess,
  fetchApplicationsFailure,
  fetchApplicationStart,
  fetchApplicationSuccess,
  fetchApplicationFailure,
  createApplicationStart,
  createApplicationSuccess,
  createApplicationFailure,
  updateApplicationStatusStart,
  updateApplicationStatusSuccess,
  updateApplicationStatusFailure,
  deleteApplicationStart,
  deleteApplicationSuccess,
  deleteApplicationFailure,
} from './applicationSlice';

// Fetch all applications (admin)
export const fetchApplications = createAsyncThunk(
  'applications/fetchApplications',
  async (params, { dispatch }) => {
    try {
      dispatch(fetchApplicationsStart());
      const response = await applicationAPI.getApplications(params);
      dispatch(fetchApplicationsSuccess(response));
      return response;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch applications';
      dispatch(fetchApplicationsFailure(errorMessage));
      throw error;
    }
  }
);

// Fetch single application
export const fetchApplication = createAsyncThunk(
  'applications/fetchApplication',
  async (id, { dispatch }) => {
    try {
      dispatch(fetchApplicationStart());
      const response = await applicationAPI.getApplication(id);
      dispatch(fetchApplicationSuccess(response));
      return response;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch application';
      dispatch(fetchApplicationFailure(errorMessage));
      throw error;
    }
  }
);

// Create new application
export const createApplication = createAsyncThunk(
  'applications/createApplication',
  async (applicationData, { dispatch }) => {
    try {
      dispatch(createApplicationStart());
      const response = await applicationAPI.createApplication(applicationData);
      dispatch(createApplicationSuccess(response));
      return response;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to create application';
      dispatch(createApplicationFailure(errorMessage));
      throw error;
    }
  }
);

// Update application status
export const updateApplicationStatus = createAsyncThunk(
  'applications/updateStatus',
  async ({ id, status }, { dispatch }) => {
    try {
      dispatch(updateApplicationStatusStart());
      await applicationAPI.updateApplicationStatus(id, status);
      dispatch(updateApplicationStatusSuccess({ id, status }));
      return { id, status };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to update application status';
      dispatch(updateApplicationStatusFailure(errorMessage));
      throw error;
    }
  }
);

// Delete application
export const deleteApplication = createAsyncThunk(
  'applications/deleteApplication',
  async (id, { dispatch }) => {
    try {
      dispatch(deleteApplicationStart());
      await applicationAPI.deleteApplication(id);
      dispatch(deleteApplicationSuccess(id));
      return id;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to delete application';
      dispatch(deleteApplicationFailure(errorMessage));
      throw error;
    }
  }
);

// Get applications for a specific job
export const fetchJobApplications = createAsyncThunk(
  'applications/fetchJobApplications',
  async (jobId, { dispatch }) => {
    try {
      dispatch(fetchApplicationsStart());
      const response = await applicationAPI.getJobApplications(jobId);
      dispatch(fetchApplicationsSuccess(response));
      return response;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch job applications';
      dispatch(fetchApplicationsFailure(errorMessage));
      throw error;
    }
  }
);

// Upload resume
export const uploadResume = createAsyncThunk(
  'applications/uploadResume',
  async (formData) => {
    try {
      const response = await applicationAPI.uploadResume(formData);
      return response;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to upload resume';
      throw new Error(errorMessage);
    }
  }
); 