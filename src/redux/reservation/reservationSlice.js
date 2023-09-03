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
  async ({ yachtId = 1, userId }) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_ENDPOINT}/yachts/${yachtId}/reservations`,
        {
          params: { user_id: userId },
        },
      );
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
);

export const deleteReservation = createAsyncThunk(
  'reservations/deleteReservation',
  async ({ userId, yachtId }) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_ENDPOINT}/yachts/${yachtId}/reservations/${userId}`,
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
    builder.addCase(deleteReservation.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteReservation.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.reservations = state.reservations.filter(
        (reservation) => reservation.id !== payload.id,
      );
      state.loaded = true;
    });
    builder.addCase(deleteReservation.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload || 'Something went wrong!';
      state.loaded = true;
    });
  },
});

export default reservationsSlice.reducer;
