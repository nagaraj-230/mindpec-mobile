// import axios from 'axios';
// import {getData} from '../Utils/localHelper';

// const API = axios.create({});

// // API.interceptors.request.use(
// //   async config => {
// //     const token = await getData('token');

// //     config.headers['Authorization'] = `Bearer ${token}`;

// //     return config;
// //   },
// //   error => {
// //     return Promise.reject(error);
// //   },
// // );

// API.interceptors.request.use(
//   async config => {
//     try {
//       const token = await getData('token'); // Fetch token from AsyncStorage

//       if (token) {
//         config.headers['Authorization'] = `Bearer ${token}`;
//       } else {
//         console.warn('No token found in AsyncStorage');
//       }

//       return config;
//     } catch (error) {
//       console.error('Error retrieving token:', error);
//       return config; // Proceed without token
//     }
//   },
//   error => {
//     return Promise.reject(error);
//   },
// );

// export default API;


// import axios from 'axios';
// import { store } from '../Store/Store';

// const API = axios.create({});

// API.interceptors.request.use(
//   async config => {
//     try {
//       // Retrieve the token from the Redux store
//       const state = store.getState();
//       const token = state.login.token; // Make sure the structure matches your store

//       if (token) {
//         config.headers['Authorization'] = `Bearer ${token}`;
//       } else {
//         console.warn('No token found in the store');
//       }

//       return config;
//     } catch (error) {
//       console.error('Error retrieving token:', error);
//       return config; // Proceed without token
//     }
//   },
//   error => {
//     return Promise.reject(error);
//   }
// );


// export default API;


// API.interceptors.request.use(
//   async config => {
//     try {
//       const token = await getData('token');
//       if (token) {
//         config.headers['Authorization'] = `Bearer ${token}`;
//       }
//     } catch (error) {
//       console.error("Error retrieving token:", error);
//     }
//     return config;
//   },
//   error => Promise.reject(error)
// );


import axios from "axios";
import { getData } from "../Utils/localHelper";

const API = axios.create();


API.interceptors.response.use(
  response => response,
  error => {
    // Extract meaningful error message
    const errorMessage = error.response?.data?.message || error.message;
    console.error('API Error:', errorMessage);

    return Promise.reject(new Error(errorMessage));
  }
);

export default API;

