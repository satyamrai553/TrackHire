import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import userReducer from '../features/user/userSlice';
import jobReducer from '../features/jobs/jobSlice';
import applicationReducer from '../features/applications/applicationSlice';
import adminReducer from '../features/admin/adminSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    jobs: jobReducer,
    applications: applicationReducer,
    admin: adminReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

// Rehydrate user from token on app start
const token = localStorage.getItem('token');
if (token) {
  // Optionally, fetch user profile from API and dispatch setUser
  // For now, just set isAuthenticated to true
  store.dispatch({ type: 'auth/loginSuccess', payload: { user: null, token } });
}

export default store; 