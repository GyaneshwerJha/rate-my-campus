import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import campusReducer from '../features/campus/campusSlice';
import campusesReducer from '../features/campuses/campusesSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    campus: campusReducer,
    campuses: campusesReducer,
  },
});
