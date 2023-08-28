import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  yachts: [],
  loaded: false,
  loading: false,
  error: null,
};

export const fetchYachts = createAsyncThunk('yachts/fetchYachts', async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_ENDPOINT}/yachts`,
    );
    return response.data?.data;
  } catch (error) {
    return error.response.data;
  }
});

const yachtsSlice = createSlice({
  name: 'yachts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchYachts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchYachts.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.yachts = payload;
      state.loaded = true;
    });
    builder.addCase(fetchYachts.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload || 'Something went wrong!';
      state.loaded = true;
    });
  },
});

export default yachtsSlice.reducer;
