import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {getTaskStatusApi} from './GetTaskStatusApi';
import {setIsLoading} from '../LoginService/LoginSlice';

const initialState = {
  taskStatusData: [],
  isLoading: false,
  error: null,
};

export const GetTaskStatusThunk = createAsyncThunk(
  'getTaskStatus',
  async (action, {dispatch}) => {
    dispatch(setIsLoading(true));
    try {
      const response = await getTaskStatusApi(action.payload);
      //   console.log('getTaskStatus ' + JSON.stringify(response));
      dispatch(setIsLoading(false));
      return response.data;
    } catch (error) {
      dispatch(setIsLoading(false));
      console.log(error);
    }
  },
);

const GetTaskStatusSlice = createSlice({
  name: 'getTaskStatus',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(GetTaskStatusThunk.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(GetTaskStatusThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.taskStatusData = action.payload; // Store task status data
      })
      .addCase(GetTaskStatusThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload; // Store error message
      });
  },
});

export const {} = GetTaskStatusSlice.actions;
export default GetTaskStatusSlice.reducer;

// // AsyncThunk for fetching task statuses
// export const GetTaskStatusThunk = createAsyncThunk(
//   'getTaskStatus',
//   async (payload, {rejectWithValue}) => {
//     try {
//       const response = await getTaskStatusApi(payload);

//       // Ensure the response structure is correct
//       if (!response || !response.data) {
//         throw new Error('Response is undefined or malformed');
//       }

//       return response.data; // Return task status data
//     } catch (error) {
//       return rejectWithValue(error.message); // Pass error to Redux state
//     }
//   },
// );
