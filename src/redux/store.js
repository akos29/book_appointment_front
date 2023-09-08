import { configureStore } from '@reduxjs/toolkit';
import yachtReducer from './yacht/yachtSlice';
import authReducer from './auth/authSlice';
import reservationReducer from './reservation/reservationSlice';

const store = configureStore({
  reducer: {
    yachts: yachtReducer,
    auth: authReducer,
    reservations: reservationReducer,
  },
});

export default store;
