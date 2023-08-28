import { configureStore } from '@reduxjs/toolkit';
import yatchReducer from './yatch/yatchSlice';
import reservationReducer from './reservation/reservationSlice';

const store = configureStore({
  reducer: {
    yatchs: yatchReducer,
    reservation: reservationReducer,
  },
});

export default store;
