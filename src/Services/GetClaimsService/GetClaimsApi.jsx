import API from '../../Api/Api';
import {GET_CLAIMS, UPDATE_CLAIMS} from '../../Api/ApiPath';

export const getClaimsApi = async payload => {
  try {
    const response = await API.post(GET_CLAIMS, payload);
    //   console.log('GET_CLAIMS API response:', JSON.stringify(response.data));
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

export const updateClaimsApi = async payload => {
  try {
    const response = await API.post(UPDATE_CLAIMS, payload);
    //   console.log('UPDATE_CLAIMS API response:', JSON.stringify(response.data));
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
