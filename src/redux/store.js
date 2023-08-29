import { configureStore } from '@reduxjs/toolkit';
import yachtReducer from './yacht/yachtSlice';
import authReducer from './auth/authSlice';

const store = configureStore({
  reducer: {
    yachts: yachtReducer,
    auth: authReducer,
  },
});

export default store;
