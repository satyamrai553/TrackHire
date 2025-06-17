import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  jobs: [],
  currentJob: null,
  loading: false,
  error: null
};

const jobSlice = createSlice({
  name: 'job',
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
    setCurrentJob: (state, action) => {
      state.currentJob = action.payload;
    },
    addJob: (state, action) => {
      state.jobs.push(action.payload);
    },
    updateJob: (state, action) => {
      const index = state.jobs.findIndex(job => job.id === action.payload.id);
      if (index !== -1) {
        state.jobs[index] = action.payload;
      }
    },
    deleteJob: (state, action) => {
      state.jobs = state.jobs.filter(job => job.id !== action.payload);
    }
  }
});

export const {
  fetchJobsStart,
  fetchJobsSuccess,
  fetchJobsFailure,
  setCurrentJob,
  addJob,
  updateJob,
  deleteJob
} = jobSlice.actions;

export default jobSlice.reducer; 