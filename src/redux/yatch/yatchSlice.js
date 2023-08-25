import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  yatchs: [],
  loaded: false,
  loading: false,
  error: null,
};

export const fetchYatchs = createAsyncThunk('yatchs/fetchYatchs', async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_ENDPOINT}/yatchs`,
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
});

const yatchsSlice = createSlice({
  name: 'yatchs',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchYatchs.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchYatchs.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.yatchs = payload;
      state.loaded = true;
    });
    builder.addCase(fetchYatchs.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload || 'Something went wrong!';
      state.loaded = true;
    });
  },
});

export default yatchsSlice.reducer;
