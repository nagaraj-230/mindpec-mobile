import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {setIsLoading} from '../LoginService/LoginSlice';
import {
  getTaskStatusHistoryApi,
  updatedTaskStatusHistoryApi,
} from './TaskHistoryApi';

const initialState = {
  getTaskHistroyData: [],
  isLoading: false,
  error: null,

  // update task
  updateTaskHistroyData: [],
};

export const GetTaskStatusHistoryThunk = createAsyncThunk(
  'getTaskStatusHistory',
  async (action, {dispatch}) => {
    dispatch(setIsLoading(true));
    try {
      console.log('payloadslice',action.payload)
      const response = await getTaskStatusHistoryApi(action.payload);
      // console.log('getTaskStatusHistoryThunk' + JSON.stringify(response));
      dispatch(setIsLoading(false));
      return response.data;
    } catch (error) {
      dispatch(setIsLoading(false));
      console.log(error);
    }
  },
);

// update the tasks
export const UpdatedTaskStatusHistoryThunk = createAsyncThunk(
  'updateTaskStatusHistroy',
  async (action, {dispatch}) => {
    dispatch(setIsLoading(true));
    try {
      console.log('updatedTaskStatusHistory Payload:',action.payload)
      const response = await updatedTaskStatusHistoryApi(action.payload);
        // console.log('get ' + JSON.stringify(response));
      dispatch(setIsLoading(false));
      return response.data;
    } catch (error) {
      dispatch(setIsLoading(false));
      console.log(error);
    }
  },
);

const getTaskStatusHistorySlice = createSlice({
  name: 'getTaskStatusHistory',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(GetTaskStatusHistoryThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log('Thunk Fulfilled:', action.payload);
        state.getTaskHistroyData = action.payload;
      })
      .addCase(UpdatedTaskStatusHistoryThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.updateTaskHistroyData = action.payload;
      });
  },
});

export const {} = getTaskStatusHistorySlice.actions;
export default getTaskStatusHistorySlice.reducer;
