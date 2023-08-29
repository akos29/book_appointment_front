import { createSlice } from '@reduxjs/toolkit';

export const reservations = [];

const initialState = {
  user: {
    username: 'Kb',
    selectedItem: 'Vespa',
    reservations: [],
  },
};

const reservationSlice = createSlice({
  name: 'reservation',
  initialState,

  reducers: {
    makeReservation: (state, action) => {
      state.reservations.push(action.payload);
    },
  },
});

export const { makeReservation } = reservationSlice.actions;
export default reservationSlice.reducer;
