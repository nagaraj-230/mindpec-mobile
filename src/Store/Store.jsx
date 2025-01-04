// import {configureStore} from '@reduxjs/toolkit';
// import LoginSlice from '../Services/LoginService/LoginSlice';
// import GetTaskStatusSlice from '../Services/GetTaskStatusService/GetTaskStatusSlice';
// import GetTasksSlice from '../Services/GetTasksService/GetTasksSlice';
// import getPrioritiesSlice from '../Services/PriorityService/PrioritiesSlice';
// import getTaskStatusHistorySlice from '../Services/TaskHistoryService/TaskHistorySlice';

// export const store = configureStore({
//   reducer: {
//     login: LoginSlice,
//     getTaskStatus: GetTaskStatusSlice,
//     getTasks: GetTasksSlice,
//     getPriorities: getPrioritiesSlice,
//     getTaskStatusHistory: getTaskStatusHistorySlice,
//   },
// });

import {configureStore, combineReducers} from '@reduxjs/toolkit';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginSlice from '../Services/LoginService/LoginSlice';
import GetTaskStatusSlice from '../Services/GetTaskStatusService/GetTaskStatusSlice';
import GetTasksSlice from '../Services/GetTasksService/GetTasksSlice';
import getTaskStatusHistorySlice from '../Services/TaskHistoryService/TaskHistorySlice';
import getClaimsSlice from '../Services/GetClaimsService/GetClaimsSlice';
import getClaimTypeSlice from '../Services/GetClaimTypeService/GetClaimTypeSlice';
import getClaimStatusSlice from '../Services/GetClaimStatusService/GetClaimStatusSlice';
import getCompanyUsersSlice from '../Services/CompanyUserService/GetCompanyUserSlice';
import GetCatogeriosSlice from '../Services/CategeoriesService/GetCategoriesSlice';
import GetTaskAssignmentSlice from '../Services/GetTaskAssignments/GetTaskAssignmentSlice';

// Redux Persist configuration
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['login'], // Persist only the login reducer
};

// Combine reducers (future-proof for more slices)
const rootReducer = combineReducers({
  login: LoginSlice,
  getTaskStatus: GetTaskStatusSlice,
  // catogerios
  getCatogeroies: GetCatogeriosSlice,
  getTasks: GetTasksSlice,
  getTaskStatusHistory: getTaskStatusHistorySlice,
  getClaimType: getClaimTypeSlice,
  getClaims: getClaimsSlice,
  getClaimStatus: getClaimStatusSlice,
  getCompanyUsers: getCompanyUsersSlice,
  getTaskAssignment: GetTaskAssignmentSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Store setup
export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
