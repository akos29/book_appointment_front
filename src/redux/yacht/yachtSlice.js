import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const apiURL = 'http://localhost:4000/api/yacht-list';

export const fetchYachts = createAsyncThunk('yacht/fetchYacht', async () => {
  try {
    const response = await axios.get(apiURL);
    return response.data;
  } catch (error) {
    // eslint-disable-next-line
    console.error('After Axios request - Error:', error);
    throw error;
  }
});

const yachtSlice = createSlice({
  name: 'yacht',

  initialState: {
    yacht: null,
    status: 'idle',
    error: null,
  },

  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchYachts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchYachts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.yacht = action.payload;
      })
      .addCase(fetchYachts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default yachtSlice.reducer;
