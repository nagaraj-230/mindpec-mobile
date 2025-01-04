import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {setIsLoading} from '../LoginService/LoginSlice';
import {getCompanyUsersApi} from './GetCompanyUserApi';

const initialState = {
  getCompanyUserData: null,
  isLoading: false,
};

export const GetCompanyUsersThunk = createAsyncThunk(
  'getCompanyUsers',
  async (action, {dispatch}) => {
    dispatch(setIsLoading(true));
    try {
      const response = await getCompanyUsersApi(action.payload);
    //   console.log('getCompanyUsers Slice ' + JSON.stringify(response));
      dispatch(setIsLoading(false));
      return response.data;
    } catch (error) {
      dispatch(setIsLoading(false));
      console.log(error);
    }
  },
);

const getCompanyUsersSlice = createSlice({
  name: 'getCompanyUsers',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(GetCompanyUsersThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      // console.log('getCompanyUserData',action.payload)
      state.getCompanyUserData = action.payload; // Store task status data
    });
  },
});

export const {} = getCompanyUsersSlice.actions;
export default getCompanyUsersSlice.reducer;
