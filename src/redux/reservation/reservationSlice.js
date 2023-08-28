import { createSlice } from '@reduxjs/toolkit';

export const reservations = [
  {
    date: '2023-08-23T10:00:00Z',
    city: 'Miami',
    user_id: 1,
    yacht_id: 1,
    created_at: '2023-08-20T08:00:00Z',
    updated_at: '2023-08-20T08:00:00Z',
    image_path: '/path/to/image1.jpg',
    yacht_name: 'Luxury Cruiser',
    price: 1500,
    duration: '4 hours',
    yacht_model: 'Model X',
  },
  {
    date: '2023-08-24T15:30:00Z',
    city: 'Los Angeles',
    user_id: 2,
    yacht_id: 2,
    created_at: '2023-08-21T10:00:00Z',
    updated_at: '2023-08-21T10:00:00Z',
    image_path: '/path/to/image2.jpg',
    yacht_name: 'Ocean Voyager',
    price: 1800,
    duration: '3 hours',
    yacht_model: 'Model Y',
  },
  {
    date: '2023-08-25T14:00:00Z',
    city: 'New York',
    user_id: 3,
    yacht_id: 3,
    created_at: '2023-08-22T12:00:00Z',
    updated_at: '2023-08-22T12:00:00Z',
    image_path: '/path/to/image3.jpg',
    yacht_name: 'Sunset Paradise',
    price: 1200,
    duration: '5 hours',
    yacht_model: 'Model Z',
  },
  {
    date: '2023-08-26T11:30:00Z',
    city: 'San Francisco',
    user_id: 4,
    yacht_id: 4,
    created_at: '2023-08-23T14:00:00Z',
    updated_at: '2023-08-23T14:00:00Z',
    image_path: '/path/to/image4.jpg',
    yacht_name: 'Sailing Adventure',
    price: 1600,
    duration: '6 hours',
    yacht_model: 'Model A',
  },
  {
    date: '2023-08-27T13:15:00Z',
    city: 'Chicago',
    user_id: 5,
    yacht_id: 5,
    created_at: '2023-08-24T16:00:00Z',
    updated_at: '2023-08-24T16:00:00Z',
    image_path: '/path/to/image5.jpg',
    yacht_name: 'Harbor Explorer',
    price: 1000,
    duration: '4 hours',
    yacht_model: 'Model B',
  },
];

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
