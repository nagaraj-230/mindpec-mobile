import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {uplaodClaimDocumentApi,downloadClaimDocumentApi} from './UploadClaimDocumentsApi';

import {setIsLoading} from '../LoginService/LoginSlice';

const initialState = {
  uplaodDocData: [],
  isLoading: false,
  error: null,

  // update task
  downloadData: [],
};

export const UploadClaimDocumentThunk = createAsyncThunk(
  'UploadClaimDocuments',
  async (action, {dispatch}) => {
    dispatch(setIsLoading(true));
    try {
      const response = await uplaodClaimDocumentApi(action.payload);
      console.log('UploadClaimDocuments ' + JSON.stringify(response));
      dispatch(setIsLoading(false));
      return response.data;
    } catch (error) {
      dispatch(setIsLoading(false));
      console.log(error);
    }
  },
);

// update the tasks
// export const DownloadClaimDocumentThunk = createAsyncThunk(
//   'DownloadClaimDocuments',
//   async (action, {dispatch}) => {
//     dispatch(setIsLoading(true));
//     try {
//       const response = await downloadClaimDocumentApi(action.payload);
//         // console.log('getTasks ' + JSON.stringify(response));
//       dispatch(setIsLoading(false));
//       return response.data;
//     } catch (error) {
//       dispatch(setIsLoading(false));
//       console.log(error);
//     }
//   },
// );

export const DownloadClaimDocumentThunk = createAsyncThunk(
  'DownloadClaimDocuments',
  async (action, { dispatch }) => {
    dispatch(setIsLoading(true));
    try {
      const fileBlob = await downloadClaimDocumentApi(action.payload);
      dispatch(setIsLoading(false));
      return fileBlob; // Return the Blob directly
    } catch (error) {
      dispatch(setIsLoading(false));
      console.error(error);
    }
  }
);


const UploadClaimDocumentSlice = createSlice({
  name: 'UploadClaimDocuments',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      // .addCase(UploadClaimDocumentThunk.pending, state => {
      //   state.isLoading = true;
      // })
      .addCase(UploadClaimDocumentThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.uplaodDocData = action.payload; // Store task status data
      })
      .addCase(DownloadClaimDocumentThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.downloadData = action.payload; // Store task status data
      });
  },
});

export const {} = UploadClaimDocumentSlice.actions;
export default UploadClaimDocumentSlice.reducer;
