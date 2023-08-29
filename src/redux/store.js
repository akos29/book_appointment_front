import { configureStore } from '@reduxjs/toolkit';
import yachtReducer from './yacht/yachtSlice';

const store = configureStore({
  reducer: {
    yachts: yachtReducer,
  },
});

export default store;
