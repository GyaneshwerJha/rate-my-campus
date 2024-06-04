import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import campusService from './campusService';

const initialState = {
  campus: {},
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
  reviewSubmit: false,
  reviewError: false,
};

// Get campus
export const getCampus = createAsyncThunk(
  'campus/get',
  async (id, thunkAPI) => {
    try {
      return await campusService.getCampus(id);
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

// Create review
export const createReview = createAsyncThunk(
  'campus/createReview',
  async (reviewData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const campus = thunkAPI.getState().campus.campus._id;
      return await campusService.createReview(reviewData, campus, token);
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

export const campusSlice = createSlice({
  name: 'campus',
  initialState,
  reducers: {
    reset: (state) => {
      state.campus = {};
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = '';
      state.reviewSubmit = false;
      state.reviewError = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCampus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCampus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.campus = action.payload;
      })
      .addCase(getCampus.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createReview.pending, (state) => {
        state.reviewSubmit = false;
      })
      .addCase(createReview.fulfilled, (state, action) => {
        state.reviewSubmit = true;
        state.campus.reviews.push(action.payload);
      })
      .addCase(createReview.rejected, (state, action) => {
        state.reviewError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = campusSlice.actions;

export default campusSlice.reducer;
