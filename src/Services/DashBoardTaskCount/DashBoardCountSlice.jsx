import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {setIsLoading} from '../LoginService/LoginSlice';
import { dashboardCountApi } from './DashBoardCountApi';

const initialState = {
  countData: [],
  isLoading: false,
  error: null,
};

export const DashboardCountThunk = createAsyncThunk(
  'dashboardcount',
  async (action, {dispatch}) => {
    dispatch(setIsLoading(true));
    try {
      const response = await dashboardCountApi(action.payload);
      //   console.log('dashboardcount ' + JSON.stringify(response));
      dispatch(setIsLoading(false));
      return response.data;
    } catch (error) {
      dispatch(setIsLoading(false));
      console.log(error);
    }
  },
);

const DashboardCountSlice = createSlice({
  name: 'dashboardcount',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(DashboardCountThunk.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(DashboardCountThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.countData = action.payload; // Store task status data
      })
      .addCase(DashboardCountThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload; // Store error message
      });
  },
});

export const {} = DashboardCountSlice.actions;
export default DashboardCountSlice.reducer;
