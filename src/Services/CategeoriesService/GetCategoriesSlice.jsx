import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {setIsLoading} from '../LoginService/LoginSlice';
import { getCategoriesApi } from './GetCategoriesApi';

const initialState = {
  catogriesData: [],
  isLoading: false,
  error: null,
};

export const GetCatogeroiesThnuk = createAsyncThunk(
  'getCatogeroies',
  async (action, {dispatch}) => {
    dispatch(setIsLoading(true));
    try {
      const response = await getCategoriesApi(action.payload);
      //   console.log('getCatogeroies ' + JSON.stringify(response));
      dispatch(setIsLoading(false));
      return response.data;
    } catch (error) {
      dispatch(setIsLoading(false));
      console.log(error);
    }
  },
);

const GetCatogeriosSlice = createSlice({
  name: 'getCatogeroies',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(GetCatogeroiesThnuk.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(GetCatogeroiesThnuk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.catogriesData = action.payload; // Store task status data
      })
      .addCase(GetCatogeroiesThnuk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload; // Store error message
      });
  },
});

export const {} = GetCatogeriosSlice.actions;
export default GetCatogeriosSlice.reducer;
