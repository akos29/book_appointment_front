import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  reservations: [],
  loaded: false,
  loading: false,
  error: null,
};

export const fetchReservations = createAsyncThunk(
  'reservations/fetchReservations',
  async ({ userId = 1 }) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_ENDPOINT}/yachts/${userId}/reservations`,
      );
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
);

export const get = createAsyncThunk('reservations/get', async (id) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_ENDPOINT}/reservations/${id}`,
    );
    return response.data;
  } catch (error) {
    return error.response;
  }
});

const reservationsSlice = createSlice({
  name: 'reservations',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchReservations.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchReservations.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.reservations = payload;
      state.loaded = true;
    });
    builder.addCase(fetchReservations.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload || 'Something went wrong!';
      state.loaded = true;
    });
  },
});

export default reservationsSlice.reducer;
