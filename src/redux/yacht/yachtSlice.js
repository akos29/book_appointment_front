import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  yachts: [],
  yacht: [],
  loaded: false,
  loading: false,
  error: null,
  yachtError: null,
  yachtLoaded: false,
  yachtLoading: false,
};

export const fetchYachts = createAsyncThunk('yachts/fetchYachts', async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_ENDPOINT}/yachts`,
      { params: { is_deleted: false } },
    );
    return response.data;
  } catch (error) {
    return error.response;
  }
});

export const getYacht = createAsyncThunk('yachts/getYacht', async (id) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_ENDPOINT}/yachts/${id}`,
    );
    return response.data;
  } catch (error) {
    return error.response;
  }
});

export const deleteYacht = createAsyncThunk(
  'yachts/deleteYacht',
  async (yachtId, thunkAPI) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_ENDPOINT}/yachts/${yachtId}`,
      );
      return yachtId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

const yachtsSlice = createSlice({
  name: 'yachts',
  initialState,
  reducers: {
    switchToUpdate: (state) => {
      state.loaded = false;
    },
  },
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
    builder.addCase(getYacht.pending, (state) => {
      state.yachtLoading = true;
    });
    builder.addCase(getYacht.fulfilled, (state, { payload }) => {
      state.yachtLoading = false;
      state.yacht = payload;
      state.yachtLoaded = true;
    });
    builder.addCase(getYacht.rejected, (state, { payload }) => {
      state.yachtLoading = false;
      state.yachtError = payload || 'Something went wrong!';
      state.yachtLoaded = true;
    });
    builder.addCase(deleteYacht.fulfilled, (state, action) => {
      state.yachts = state.yachts.filter(
        (yacht) => yacht.id !== action.payload,
      );
    });

    builder.addCase(deleteYacht.rejected, (state, action) => {
      state.error = action.error.message || 'Delete request failed';
    });
  },
});

export const { switchToUpdate } = yachtsSlice.actions;

export default yachtsSlice.reducer;
