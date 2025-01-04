import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {setIsLoading} from '../LoginService/LoginSlice';
import {getClaimsApi, updateClaimsApi} from './GetClaimsApi';

const initialState = {
  getClaimsData: null,
  isLoading: false,

  updateClaimsData: null,
};

export const GetClaimsThunk = createAsyncThunk(
  'getClaims',
  async (action, {dispatch}) => {
    dispatch(setIsLoading(true));
    try {
      const response = await getClaimsApi(action.payload);
      //   console.log('getClaimType ' + JSON.stringify(response));
      dispatch(setIsLoading(false));
      return response.data;
    } catch (error) {
      dispatch(setIsLoading(false));
      console.log(error);
    }
  },
);

export const UpdateClaimsThunk = createAsyncThunk(
  'updateClaims',
  async (action, {dispatch}) => {
    dispatch(setIsLoading(true));
    try {
      const response = await updateClaimsApi(action.payload);
      //   console.log('getClaimType ' + JSON.stringify(response));
      dispatch(setIsLoading(false));
      return response.data;
    } catch (error) {
      dispatch(setIsLoading(false));
      console.log(error);
    }
  },
);

const getClaimsSlice = createSlice({
  name: 'getClaims',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(GetClaimsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.getClaimsData = action.payload; // Store task status data
      })
      .addCase(UpdateClaimsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.updateClaimsData = action.payload; // Store task status data
      });
  },
});

export const {} = getClaimsSlice.actions;
export default getClaimsSlice.reducer;
