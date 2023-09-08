import { createSlice } from '@reduxjs/toolkit';

const loadData = JSON.parse(localStorage.getItem('auth_data'));
const initialState = {
  isAuthenticated: loadData?.isAuthenticated || false,
  user: loadData?.user || {},
  accessToken: loadData?.accessToken || '',
  error: loadData?.error || null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, { payload }) => {
      state.user = payload.user || {};
      state.accessToken = payload.jwt || '';
      state.isAuthenticated = true;
      localStorage.setItem('auth_data', JSON.stringify(state));
    },
    register: (state, { payload }) => {
      state.user = payload.user || {};
      state.accessToken = payload.jwt || '';
      state.isAuthenticated = true;
      localStorage.setItem('auth_data', JSON.stringify(state));
    },
    logout: (state, { payload }) => {
      state.accessToken = '';
      state.user = {};
      state.isAuthenticated = false;
      state.error = null || payload;
      localStorage.setItem('auth_data', JSON.stringify(state));
    },
  },
});

export const { login, logout, register } = authSlice.actions;

export default authSlice.reducer;
