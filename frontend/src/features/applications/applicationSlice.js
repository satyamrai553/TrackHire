// features/application/applicationSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  applications: [],
  currentApplication: null,
  loading: false,
  error: null,
};

const applicationSlice = createSlice({
  name: 'application',
  initialState,
  reducers: {
    applicationRequestStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    applicationRequestFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setApplications: (state, action) => {
      state.applications = action.payload;
      state.loading = false;
    },
    setCurrentApplication: (state, action) => {
      state.currentApplication = action.payload;
      state.loading = false;
    },
    addApplication: (state, action) => {
      state.applications.unshift(action.payload);
      state.loading = false;
    },
    updateApplication: (state, action) => {
      const index = state.applications.findIndex(app => app._id === action.payload._id);
      if (index !== -1) {
        state.applications[index] = action.payload;
      }
      state.loading = false;
    },
    removeApplication: (state, action) => {
      state.applications = state.applications.filter(app => app._id !== action.payload);
      state.loading = false;
    }
  }
});

export const {
  applicationRequestStart,
  applicationRequestFailure,
  setApplications,
  setCurrentApplication,
  addApplication,
  updateApplication,
  removeApplication
} = applicationSlice.actions;

export default applicationSlice.reducer;
