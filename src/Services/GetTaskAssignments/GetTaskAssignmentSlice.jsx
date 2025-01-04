import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {setIsLoading} from '../LoginService/LoginSlice';
import {getTaskAssignmentApi} from './GetTaskAssignmentApi';

const initialState = {
  getTaskAssignmentData: [],
  isLoading: false,
  error: null,
};

export const GetTaskAssignmentThunk = createAsyncThunk(
  'getTaskAssignment',
  async (action, {dispatch}) => {
    dispatch(setIsLoading(true));
    try {
      const response = await getTaskAssignmentApi(action.payload);
      //   console.log('getTaskAssignment ' + JSON.stringify(response));
      dispatch(setIsLoading(false));
      return response.data;
    } catch (error) {
      dispatch(setIsLoading(false));
      console.log(error);
    }
  },
);

const GetTaskAssignmentSlice = createSlice({
  name: 'getTaskAssignment',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(GetTaskAssignmentThunk.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(GetTaskAssignmentThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.getTaskAssignmentData = action.payload; // Store task status data
      })
      .addCase(GetTaskAssignmentThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload; // Store error message
      });
  },
});

export const {} = GetTaskAssignmentSlice.actions;
export default GetTaskAssignmentSlice.reducer;
