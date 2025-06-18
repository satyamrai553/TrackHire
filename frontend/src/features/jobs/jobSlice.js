import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  jobs: [],
  currentJob: null,
  categories: [],
  filters: {
    search: '',
    category: '',
    location: '',
    type: '',
  },
  loading: false,
  error: null,
};

const jobSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    fetchJobsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchJobsSuccess: (state, action) => {
      state.loading = false;
      state.jobs = action.payload;
      state.error = null;
    },
    fetchJobsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchJobStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchJobSuccess: (state, action) => {
      state.loading = false;
      state.currentJob = action.payload;
      state.error = null;
    },
    fetchJobFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    createJobStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    createJobSuccess: (state, action) => {
      state.loading = false;
      state.jobs.unshift(action.payload);
      state.error = null;
    },
    createJobFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateJobStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateJobSuccess: (state, action) => {
      state.loading = false;
      const index = state.jobs.findIndex(job => job.id === action.payload.id);
      if (index !== -1) {
        state.jobs[index] = action.payload;
      }
      if (state.currentJob?.id === action.payload.id) {
        state.currentJob = action.payload;
      }
      state.error = null;
    },
    updateJobFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteJobStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteJobSuccess: (state, action) => {
      state.loading = false;
      state.jobs = state.jobs.filter(job => job.id !== action.payload);
      if (state.currentJob?.id === action.payload) {
        state.currentJob = null;
      }
      state.error = null;
    },
    deleteJobFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchCategoriesStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchCategoriesSuccess: (state, action) => {
      state.loading = false;
      state.categories = action.payload;
      state.error = null;
    },
    fetchCategoriesFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = {
        search: '',
        category: '',
        location: '',
        type: '',
      };
    },
    clearJobError: (state) => {
      state.error = null;
    },
  },
});

export const {
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
  setFilters,
  clearFilters,
  clearJobError,
} = jobSlice.actions;

export default jobSlice.reducer; 