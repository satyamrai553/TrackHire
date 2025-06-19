// store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import userReducer from './features/user/userSlice';
import jobReducer from './features/job/jobSlice';
import applicationReducer from './features/application/applicationSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,  
    user: userReducer,
    job: jobReducer,
    application: applicationReducer,
  },
});

export default store;