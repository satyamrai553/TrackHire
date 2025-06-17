import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import jobReducer from './jobSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    job: jobReducer,
  },
});

export default store; 