import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import campusesService from './campusesService';

const initialState = {
  campuses: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
  campusSubmit: false,
};

// Get campuses
export const getCampuses = createAsyncThunk(
  'campuses/getAll',
  async (_, thunkAPI) => {
    try {
      return await campusesService.getCampuses();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Create new campus
export const createCampus = createAsyncThunk(
  'campuses/create',
  async (campusData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await campusesService.createCampus(campusData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const campusesSlice = createSlice({
  name: 'campuses',
  initialState,
  reducers: {
    reset: (state) => {
      state.campuses = [];
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = '';
      state.campusSubmit = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCampus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCampus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.campusSubmit = true;
      })
      .addCase(createCampus.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getCampuses.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCampuses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.campuses = action.payload;
      })
      .addCase(getCampuses.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = campusesSlice.actions;

export default campusesSlice.reducer;
