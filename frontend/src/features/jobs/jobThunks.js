import { createAsyncThunk } from '@reduxjs/toolkit';
import { jobAPI } from '../../api/jobAPI';
import {
  fetchJobsStart,
  fetchJobsSuccess,
  fetchJobsFailure,
  fetchJobStart,
  fetchJobSuccess,
  fetchJobFailure,
  createJobStart,
  createJobSuccess,
  createJobFailure,
  updateJobStart,
  updateJobSuccess,
  updateJobFailure,
  deleteJobStart,
  deleteJobSuccess,
  deleteJobFailure,
  fetchCategoriesStart,
  fetchCategoriesSuccess,
  fetchCategoriesFailure,
} from './jobSlice';

// Fetch all jobs
export const fetchJobs = createAsyncThunk(
  'jobs/fetchJobs',
  async (params, { dispatch }) => {
    try {
      dispatch(fetchJobsStart());
      const response = await jobAPI.getJobs(params);
      dispatch(fetchJobsSuccess(response));
      return response;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch jobs';
      dispatch(fetchJobsFailure(errorMessage));
      throw error;
    }
  }
);

// Fetch single job
export const fetchJob = createAsyncThunk(
  'jobs/fetchJob',
  async (id, { dispatch }) => {
    try {
      dispatch(fetchJobStart());
      const response = await jobAPI.getJob(id);
      dispatch(fetchJobSuccess(response));
      return response;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch job';
      dispatch(fetchJobFailure(errorMessage));
      throw error;
    }
  }
);

// Create new job
export const createJob = createAsyncThunk(
  'jobs/createJob',
  async (jobData, { dispatch }) => {
    try {
      dispatch(createJobStart());
      const response = await jobAPI.createJob(jobData);
      dispatch(createJobSuccess(response));
      return response;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to create job';
      dispatch(createJobFailure(errorMessage));
      throw error;
    }
  }
);

// Update job
export const updateJob = createAsyncThunk(
  'jobs/updateJob',
  async ({ id, jobData }, { dispatch }) => {
    try {
      dispatch(updateJobStart());
      const response = await jobAPI.updateJob(id, jobData);
      dispatch(updateJobSuccess(response));
      return response;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to update job';
      dispatch(updateJobFailure(errorMessage));
      throw error;
    }
  }
);

// Delete job
export const deleteJob = createAsyncThunk(
  'jobs/deleteJob',
  async (id, { dispatch }) => {
    try {
      dispatch(deleteJobStart());
      await jobAPI.deleteJob(id);
      dispatch(deleteJobSuccess(id));
      return id;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to delete job';
      dispatch(deleteJobFailure(errorMessage));
      throw error;
    }
  }
);

// Search jobs
export const searchJobs = createAsyncThunk(
  'jobs/searchJobs',
  async (searchParams, { dispatch }) => {
    try {
      dispatch(fetchJobsStart());
      const response = await jobAPI.searchJobs(searchParams);
      dispatch(fetchJobsSuccess(response));
      return response;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to search jobs';
      dispatch(fetchJobsFailure(errorMessage));
      throw error;
    }
  }
);

// Fetch job categories
export const fetchJobCategories = createAsyncThunk(
  'jobs/fetchCategories',
  async (_, { dispatch }) => {
    try {
      dispatch(fetchCategoriesStart());
      const response = await jobAPI.getCategories();
      dispatch(fetchCategoriesSuccess(response));
      return response;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch categories';
      dispatch(fetchCategoriesFailure(errorMessage));
      throw error;
    }
  }
); 