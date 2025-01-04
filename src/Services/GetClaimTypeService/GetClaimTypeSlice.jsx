import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {setIsLoading} from '../LoginService/LoginSlice';
import { getClaimTypeApi } from './GetClaimTypeApi';

const initialState ={
    claimsType: [],
    isLoading: false,
}

export const GetClaimTypeThunk = createAsyncThunk(
    'getClaimType',
    async (action, {dispatch}) => {
      dispatch(setIsLoading(true));
      try {
        const response = await getClaimTypeApi(action.payload);
        //   console.log('getClaimType ' + JSON.stringify(response));
        dispatch(setIsLoading(false));
        return response.data;
      } catch (error) {
        dispatch(setIsLoading(false));
        console.log(error);
      }
    },
  );


  
const getClaimTypeSlice = createSlice({
    name: 'getClaimType',
    initialState,
    reducers: {},
    extraReducers: builder => {
      builder
        .addCase(GetClaimTypeThunk.fulfilled, (state, action) => {
          state.isLoading = false;
          state.claimsType = action.payload; // Store task status data
        })
    },
  });
  
  export const {} = getClaimTypeSlice.actions;
  export default getClaimTypeSlice.reducer;
  