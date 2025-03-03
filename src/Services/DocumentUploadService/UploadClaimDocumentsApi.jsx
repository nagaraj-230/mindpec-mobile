import API from '../../Api/Api';
import {
  UPLOAD_CLAIM_DOCUMENT,
  DOWNLOAD_CLAIM_DOCUMENT,
} from '../../Api/ApiPath';
import { Alert, Platform, PermissionsAndroid } from 'react-native';
import RNFS from 'react-native-fs';

export const uplaodClaimDocumentApi = async payload => {
  try {
    const response = await API.post(UPLOAD_CLAIM_DOCUMENT, payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Accept: '*/*',
      },
    });

    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      'Unknown error occurred';
    console.error('API Error:', errorMessage);
    throw new Error(errorMessage); // Pass a meaningful error to the caller
  }
};


const requestStoragePermission = async () => {
  if (Platform.OS === 'android') {
    try {
      if (Platform.Version >= 30) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } else {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      }
    } catch (err) {
      console.warn('Permission error:', err);
      return false;
    }
  }
  return true;
};


// export const downloadClaimDocumentApi = async payload => {
//   // console.log('DOWNLOAD_CLAIM_DOCUMENT:', DOWNLOAD_CLAIM_DOCUMENT, 'PayLoad:', JSON.stringify(payload));
//   try {
//     const response = await API.post(DOWNLOAD_CLAIM_DOCUMENT, payload);
//       console.log('DOWNLOAD_CLAIM_DOCUMENT API response:', JSON.stringify(response.data));
//     return response.data;
//   } catch (error) {
//     const errorMessage =
//       error.response?.data?.message ||
//       error.message ||
//       'Unknown error occurred';
//     console.error('API Error:', errorMessage);
//     throw new Error(errorMessage); // Pass a meaningful error to the caller
//   }
// };

export const downloadClaimDocumentApi = async (payload) => {
  try {
    const response = await API.post(DOWNLOAD_CLAIM_DOCUMENT, payload, {
      responseType: 'blob', // Ensure response is handled as a file
    });

    return response.data; // This will now be a Blob
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || error.message || 'Unknown error occurred';
    console.error('API Error:', errorMessage);
    throw new Error(errorMessage);
  }
};
