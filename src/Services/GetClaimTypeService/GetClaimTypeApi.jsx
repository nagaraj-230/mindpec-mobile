import API from '../../Api/Api';
import {CLAIMS_TYPE} from '../../Api/ApiPath';

export const getClaimTypeApi = async payload => {
  try {
    const response = await API.post(CLAIMS_TYPE, payload);
    //   console.log('CLAIMS_TYPE API response:', JSON.stringify(response.data));
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
