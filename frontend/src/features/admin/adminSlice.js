// features/admin/adminSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [],
  jobs: [],
  loading: false,
  error: null,
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    adminRequestStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    adminRequestFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // User reducers
    setUsers: (state, action) => {
      state.users = action.payload;
      state.loading = false;
    },
    removeUser: (state, action) => {
      state.users = state.users.filter(user => user._id !== action.payload);
      state.loading = false;
    },

    // Job reducers
    setJobs: (state, action) => {
      state.jobs = action.payload;
      state.loading = false;
    },
    removeJob: (state, action) => {
      state.jobs = state.jobs.filter(job => job._id !== action.payload);
      state.loading = false;
    }
  }
});

export const {
  adminRequestStart,
  adminRequestFailure,
  setUsers,
  removeUser,
  setJobs,
  removeJob
} = adminSlice.actions;

export default adminSlice.reducer;
