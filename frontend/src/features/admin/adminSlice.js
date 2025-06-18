import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [],
  dashboardStats: null,
  analytics: null,
  loading: false,
  error: null,
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    fetchUsersStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchUsersSuccess: (state, action) => {
      state.loading = false;
      state.users = action.payload;
      state.error = null;
    },
    fetchUsersFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateUserRoleStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateUserRoleSuccess: (state, action) => {
      state.loading = false;
      const { id, role } = action.payload;
      const index = state.users.findIndex(user => user.id === id);
      if (index !== -1) {
        state.users[index].role = role;
      }
      state.error = null;
    },
    updateUserRoleFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteUserStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteUserSuccess: (state, action) => {
      state.loading = false;
      state.users = state.users.filter(user => user.id !== action.payload);
      state.error = null;
    },
    deleteUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchDashboardStatsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchDashboardStatsSuccess: (state, action) => {
      state.loading = false;
      state.dashboardStats = action.payload;
      state.error = null;
    },
    fetchDashboardStatsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchAnalyticsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchAnalyticsSuccess: (state, action) => {
      state.loading = false;
      state.analytics = action.payload;
      state.error = null;
    },
    fetchAnalyticsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearAdminError: (state) => {
      state.error = null;
    },
  },
});

export const {
  fetchUsersStart,
  fetchUsersSuccess,
  fetchUsersFailure,
  updateUserRoleStart,
  updateUserRoleSuccess,
  updateUserRoleFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  fetchDashboardStatsStart,
  fetchDashboardStatsSuccess,
  fetchDashboardStatsFailure,
  fetchAnalyticsStart,
  fetchAnalyticsSuccess,
  fetchAnalyticsFailure,
  clearAdminError,
} = adminSlice.actions;

export default adminSlice.reducer; 