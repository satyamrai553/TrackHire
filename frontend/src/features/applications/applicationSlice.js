import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  applications: [],
  currentApplication: null,
  loading: false,
  error: null,
};

const applicationSlice = createSlice({
  name: 'applications',
  initialState,
  reducers: {
    fetchApplicationsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchApplicationsSuccess: (state, action) => {
      state.loading = false;
      state.applications = action.payload;
      state.error = null;
    },
    fetchApplicationsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchApplicationStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchApplicationSuccess: (state, action) => {
      state.loading = false;
      state.currentApplication = action.payload;
      state.error = null;
    },
    fetchApplicationFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    createApplicationStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    createApplicationSuccess: (state, action) => {
      state.loading = false;
      state.applications.unshift(action.payload);
      state.error = null;
    },
    createApplicationFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateApplicationStatusStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateApplicationStatusSuccess: (state, action) => {
      state.loading = false;
      const { id, status } = action.payload;
      const index = state.applications.findIndex(app => app.id === id);
      if (index !== -1) {
        state.applications[index].status = status;
      }
      if (state.currentApplication?.id === id) {
        state.currentApplication.status = status;
      }
      state.error = null;
    },
    updateApplicationStatusFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteApplicationStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteApplicationSuccess: (state, action) => {
      state.loading = false;
      state.applications = state.applications.filter(app => app.id !== action.payload);
      if (state.currentApplication?.id === action.payload) {
        state.currentApplication = null;
      }
      state.error = null;
    },
    deleteApplicationFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearApplicationError: (state) => {
      state.error = null;
    },
  },
});

export const {
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
  clearApplicationError,
} = applicationSlice.actions;

export default applicationSlice.reducer; 