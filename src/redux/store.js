import { configureStore } from '@reduxjs/toolkit';
import yatchReducer from './yatch/yatchSlice';

const store = configureStore({
  reducer: {
    yatchs: yatchReducer,
  },
});

export default store;
