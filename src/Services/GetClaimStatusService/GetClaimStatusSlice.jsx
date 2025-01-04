import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {setIsLoading} from '../LoginService/LoginSlice';
import {getClaimStatusApi,} from './GetClaimStatusApi';

const initialState = {
  getClaimStatusData: null,
  isLoading: false,

};

export const GetClaimStatusThunk = createAsyncThunk(
  'getClaimStatus',
  async (action, {dispatch}) => {
    dispatch(setIsLoading(true));
    try {
      const response = await getClaimStatusApi(action.payload);
      //   console.log('getClaimType ' + JSON.stringify(response));
      dispatch(setIsLoading(false));
      return response.data;
    } catch (error) {
      dispatch(setIsLoading(false));
      console.log(error);
    }
  },
);

const getClaimStatusSlice = createSlice({
  name: 'getClaimStatus',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(GetClaimStatusThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.getClaimStatusData = action.payload; // Store task status data
      })
  },
});

export const {} = getClaimStatusSlice.actions;
export default getClaimStatusSlice.reducer;
