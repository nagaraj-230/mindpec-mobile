import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {loginApi} from './LoginApi';
import {storeData} from '../../Utils/localHelper';
import {Alert} from 'react-native';

const initialState = {
  loginData: null, // Token and user info
  isLoader: false,
};

export const LoginThunk = createAsyncThunk(
  'login',
  async ({navigation, payload}, {dispatch}) => {
    dispatch(setIsLoading(true));
    try {
      const response = await loginApi(payload);

      console.log('Login slice Response:', response);

      // Check if APIResult_ID indicates success
      if (response.data?.APIResult_ID === 1) {
        const userData = {
          token: response.token,
          loginUserID: response.data.LoginUserID,
          userName: response.data.UserName,
          companyID: response.data.CompanyID,
          companyName: response.data.CompanyName,
          userRoleID: response.data.UserRoleID,
          userRoleName: response.data.UserRoleName,
        };
        await storeData('token', response.token); // Store the token
        await storeData('user', response.data);
        await storeData('userData', userData);

        // Store user info
        // Navigate to the dashboard with user details
        // console.log('Navigating to dashboard with params:', {
        //   userName: response.data.UserName,
        //   roleName: response.data.UserRoleName,
        // });
        // navigation.navigate('dashboard', {
        //   userName: response.data.UserName,
        //   roleName: response.data.UserRoleName,
        // });

        return response; // Return the full response for extraReducers
      } else {
        throw new Error(response.errorMessage || 'Invalid login credentials');
        // Alert.alert(response.errorMessage || 'Invalid login credentials');
        // return rejectWithValue(response.errorMessage || 'Invalid login credentials');

      }
    } catch (error) {
      console.error('Login Error:', error.message);
      throw error;
      // return rejectWithValue(error.message);
    } finally {
      dispatch(setIsLoading(false));
    }
  },
);

const LoginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setIsLoading: (state, action) => {
      state.isLoader = action.payload;
    },
    setLoginData: (state, action) => {
      state.loginData = action.payload; // Store token and user data
    },
    clearLoginData: state => {
      state.loginData = null; // Clear on logout
    },
  },
});

export const {setIsLoading, setLoginData, clearLoginData} = LoginSlice.actions;
export default LoginSlice.reducer;
