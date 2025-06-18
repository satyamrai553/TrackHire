import { createSlice } from '@reduxjs/toolkit';
import {
  loginUser,
  registerUser,
  logoutUser
} from '../auth/authThunks';
// import { setCookie, deleteCookie } from '../../utils/cookies'; // Removed because file does not exist

// Status constants for consistent state tracking
const Status = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCEEDED: 'succeeded',
  FAILED: 'failed',
};

const initialState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  isAdmin: false,
  status: Status.IDLE,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Reset auth state
    resetAuthState: () => initialState,
    
    // Set credentials from cookies/initial load
    setCredentials: (state, action) => {
      const { user, accessToken, refreshToken } = action.payload;
      state.user = user;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.isAuthenticated = true;
      state.isAdmin = user?.role === 'admin';
      // Optionally store tokens in localStorage
      if (accessToken) localStorage.setItem('accessToken', accessToken);
      if (refreshToken) localStorage.setItem('refreshToken', refreshToken);
    },
    
    // Clear credentials on logout
    clearCredentials: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      state.isAdmin = false;
      // Remove tokens from localStorage
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    },
    
    // Update user profile data
    updateUserProfile: (state, action) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
  },
  extraReducers: (builder) => {
    // Login Thunk Cases
    builder.addCase(loginUser.pending, (state) => {
      state.status = Status.LOADING;
      state.error = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      const { user, accessToken, refreshToken } = action.payload;
      state.user = user;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.isAuthenticated = true;
      state.isAdmin = user.role === 'admin';
      state.status = Status.SUCCEEDED;
      // Store tokens in localStorage
      if (accessToken) localStorage.setItem('accessToken', accessToken);
      if (refreshToken) localStorage.setItem('refreshToken', refreshToken);
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.status = Status.FAILED;
      state.error = action.payload || 'Login failed';
    });

    // Register Thunk Cases
    builder.addCase(registerUser.pending, (state) => {
      state.status = Status.LOADING;
      state.error = null;
    });
    builder.addCase(registerUser.fulfilled, (state) => {
      state.status = Status.SUCCEEDED;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.status = Status.FAILED;
      state.error = action.payload || 'Registration failed';
    });

    // Logout Thunk Cases
    builder.addCase(logoutUser.fulfilled, (state) => {
      Object.assign(state, initialState);
      // Remove tokens from localStorage
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    });
  },
});

// Export actions
export const { 
  resetAuthState, 
  setCredentials, 
  clearCredentials, 
  updateUserProfile 
} = authSlice.actions;

// Export selectors
export const selectCurrentUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectIsAdmin = (state) => state.auth.isAdmin;
export const selectAuthStatus = (state) => state.auth.status;
export const selectAuthError = (state) => state.auth.error;

// Export status constants
export { Status };

export default authSlice.reducer;