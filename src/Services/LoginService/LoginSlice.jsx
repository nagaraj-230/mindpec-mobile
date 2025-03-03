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

      const {data, token} = response;

      // Ensure we have valid data and token
      if (!data || !Array.isArray(data) || !token) {
        throw new Error('Invalid response format.');
      }

      // Check if all APIResult_ID values are 1
      const isValidLogin = data.every(item => item.APIResult_ID === 1);

      if (!isValidLogin) {
        throw new Error('Login failed. Please check your credentials.');
      }

      await storeData('token', token); // Store token globally
      await storeData('user', data); // Store full user data array

      // if (data.length === 1) {
      //   // Single company case: Store and navigate immediately
      //   const userData = {
      //     token,
      //     loginUserID: data[0].LoginUserID,
      //     userName: data[0].UserName,
      //     companyID: data[0].CompanyID,
      //     companyName: data[0].CompanyName,
      //     userRoleID: data[0].UserRoleID,
      //     userRoleName: data[0].UserRoleName,
      //   };

      //   await storeData('userData', userData);
      //   // navigation.navigate('dashboard',userName); // Redirect to Dashboard
      // }

      return response;
    } catch (error) {
      console.error('Login Error:', error.message);
      throw error;
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

// last working - single data handling
// import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
// import {loginApi} from './LoginApi';
// import {storeData} from '../../Utils/localHelper';
// import {Alert} from 'react-native';

// const initialState = {
//   loginData: null, // Token and user info
//   isLoader: false,
// };

// export const LoginThunk = createAsyncThunk(
//   'login',
//   async ({navigation, payload}, {dispatch}) => {
//     dispatch(setIsLoading(true));
//     try {
//       const response = await loginApi(payload);

//       console.log('Login slice Response:', response);

//       // Check if APIResult_ID indicates success
//       if (response.data?.APIResult_ID === 1) {
//         const userData = {
//           token: response.token,
//           loginUserID: response.data.LoginUserID,
//           userName: response.data.UserName,
//           companyID: response.data.CompanyID,
//           companyName: response.data.CompanyName,
//           userRoleID: response.data.UserRoleID,
//           userRoleName: response.data.UserRoleName,
//         };
//         await storeData('token', response.token); // Store the token
//         await storeData('user', response.data);
//         await storeData('userData', userData);

//         // Store user info
//         // Navigate to the dashboard with user details
//         // console.log('Navigating to dashboard with params:', {
//         //   userName: response.data.UserName,
//         //   roleName: response.data.UserRoleName,
//         // });
//         // navigation.navigate('dashboard', {
//         //   userName: response.data.UserName,
//         //   roleName: response.data.UserRoleName,
//         // });

//         return response; // Return the full response for extraReducers
//       } else {
//         throw new Error(response.errorMessage || 'Invalid login credentials');
//         // Alert.alert(response.errorMessage || 'Invalid login credentials');
//         // return rejectWithValue(response.errorMessage || 'Invalid login credentials');
//       }
//     } catch (error) {
//       console.error('Login Error:', error.message);
//       throw error;
//       // return rejectWithValue(error.message);
//     } finally {
//       dispatch(setIsLoading(false));
//     }
//   },
// );

// const LoginSlice = createSlice({
//   name: 'login',
//   initialState,
//   reducers: {
//     setIsLoading: (state, action) => {
//       state.isLoader = action.payload;
//     },
//     setLoginData: (state, action) => {
//       state.loginData = action.payload; // Store token and user data
//     },
//     clearLoginData: state => {
//       state.loginData = null; // Clear on logout
//     },
//   },
// });

// export const {setIsLoading, setLoginData, clearLoginData} = LoginSlice.actions;
// export default LoginSlice.reducer;

// my test
// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import { loginApi } from './LoginApi';
// import { storeData } from '../../Utils/localHelper';

// const initialState = {
//   loginData: null, // Stores login response
//   isLoader: false,
//   companies: [], // Stores multiple companies
// };

// export const LoginThunk = createAsyncThunk(
//   'login',
//   async ({ navigation, payload }, { dispatch }) => {
//     dispatch(setIsLoading(true));
//     try {
//       const response = await loginApi(payload);

//       console.log('Login slice Response:', response);

//       if (response.success && response.data.length > 0) {
//         const companies = response.data.map(company => ({
//           companyID: company.CompanyID,
//           companyName: company.CompanyName,
//           userRoleID: company.UserRoleID,
//           userRoleName: company.UserRoleName,
//         }));

//         await storeData('token', response.token); // Store token
//         await storeData('companies', companies); // Store company list

//         return {
//           token: response.token,
//           companies,
//         };
//       } else {
//         throw new Error(response.errorMessage || 'Invalid login credentials');
//       }
//     } catch (error) {
//       console.error('Login Error:', error.message);
//       throw error;
//     } finally {
//       dispatch(setIsLoading(false));
//     }
//   }
// );

// const LoginSlice = createSlice({
//   name: 'login',
//   initialState,
//   reducers: {
//     setIsLoading: (state, action) => {
//       state.isLoader = action.payload;
//     },
//     setLoginData: (state, action) => {
//       state.loginData = action.payload;
//     },
//     clearLoginData: (state) => {
//       state.loginData = null;
//       state.companies = [];
//     },
//   },
// });

// export const { setIsLoading, setLoginData, clearLoginData } = LoginSlice.actions;
// export default LoginSlice.reducer;
