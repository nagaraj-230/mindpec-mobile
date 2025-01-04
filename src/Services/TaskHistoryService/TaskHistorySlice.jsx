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


// export const GetTaskStatusHistoryThunk = createAsyncThunk(
//   'getTaskStatusHistory',
//   async (action, { dispatch }) => {
//     dispatch(setIsLoading(true));
//     try {
//       const response = await getTaskStatusHistoryApi(action.payload);
//       console.log('API Response in Thunk:', response); // Log the response
//       dispatch(setIsLoading(false));
//       return response.data ; // Return response.data or the full response
//     } catch (error) {
//       dispatch(setIsLoading(false));
//       console.error('Thunk Error:', error);
//       throw error; // Ensure error propagates
//     }
//   }
// );

// update the tasks
export const UpdatedTaskStatusHistoryThunk = createAsyncThunk(
  'updateTaskStatusHistroy',
  async (action, {dispatch}) => {
    dispatch(setIsLoading(true));
    try {
      console.log('updatedTaskStatusHistory Payload:',action.payload)
      const response = await updatedTaskStatusHistoryApi(action.payload);
        console.log('get ' + JSON.stringify(response));
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

// import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
// import {setIsLoading} from '../LoginService/LoginSlice';
// import {
//   getTaskStatusHistoryApi,
//   updatedTaskStatusHistoryApi,
// } from './TaskHistoryApi';

// const initialState = {
//   getTaskhistroyData: [],
//   isLoading: false,
//   error: null,

//   // update task
//   updateTaskHistroyData: [],
// };

// export const GetTaskStatusHistoryThunk = createAsyncThunk(
//   'getTasks',
//   async (action, {dispatch}) => {
//     dispatch(setIsLoading(true));
//     try {
//       const response = await getTaskStatusHistoryApi(action.payload);
//       //   console.log('getTasks ' + JSON.stringify(response));
//       dispatch(setIsLoading(false));
//       return response.data;
//     } catch (error) {
//       dispatch(setIsLoading(false));
//       console.log(error);
//     }
//   },
// );

// // update the tasks
// export const UpdatedTaskStatusHistoryThunk = createAsyncThunk(
//   'updateTasks',
//   async (action, {dispatch}) => {
//     dispatch(setIsLoading(true));
//     try {
//       const response = await updatedTaskStatusHistoryApi(action.payload);
//       //   console.log('getTasks ' + JSON.stringify(response));
//       dispatch(setIsLoading(false));
//       return response.data;
//     } catch (error) {
//       dispatch(setIsLoading(false));
//       console.log(error);
//     }
//   },
// );

// const getTaskStatusHistorySlice = createSlice({
//   name: 'getTaskStatusHistory',
//   initialState,
//   reducers: {},
//   extraReducers: builder => {
//     builder
//       .addCase(GetTaskStatusHistoryThunk.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.getTaskhistroyData = action.payload; // Store task status data
//       })
//       .addCase(UpdatedTaskStatusHistoryThunk.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.updateTaskHistroyData = action.payload; // Store task status data
//       });
//   },
// });

// export const {} = getTaskStatusHistorySlice.actions;
// export default getTaskStatusHistorySlice.reducer;
