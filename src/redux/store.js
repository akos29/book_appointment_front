import { configureStore } from '@reduxjs/toolkit';
import yachtReducer from './yacht/yachtSlice';

const store = configureStore({
  reducer: {
    greeting: yachtReducer,
  },
});

export default store;
