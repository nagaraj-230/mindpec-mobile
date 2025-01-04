import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {getTasksApi, updateTasksApi} from './GetTasksApi';

import {setIsLoading} from '../LoginService/LoginSlice';

const initialState = {
  tasksData: [],
  isLoading: false,
  error: null,

  // update task
  updateData: [],
};

export const GetTasksThunk = createAsyncThunk(
  'getTasks',
  async (action, {dispatch}) => {
    dispatch(setIsLoading(true));
    try {
      const response = await getTasksApi(action.payload);
        console.log('getTasks ' + JSON.stringify(response));
      dispatch(setIsLoading(false));
      return response.data;
    } catch (error) {
      dispatch(setIsLoading(false));
      console.log(error);
    }
  },
);

// update the tasks

export const UpdateTasksThunk = createAsyncThunk(
  'updateTasks',
  async (action, {dispatch}) => {
    dispatch(setIsLoading(true));
    try {
      const response = await updateTasksApi(action.payload);
      //   console.log('getTasks ' + JSON.stringify(response));
      dispatch(setIsLoading(false));
      return response.data;
    } catch (error) {
      dispatch(setIsLoading(false));
      console.log(error);
    }
  },
);

const getTasksSlice = createSlice({
  name: 'getTasks',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      // .addCase(GetTasksThunk.pending, state => {
      //   state.isLoading = true;
      // })
      .addCase(GetTasksThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tasksData = action.payload; // Store task status data
      })
      .addCase(UpdateTasksThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.updateData = action.payload; // Store task status data
      });
  },
});

export const {} = getTasksSlice.actions;
export default getTasksSlice.reducer;
