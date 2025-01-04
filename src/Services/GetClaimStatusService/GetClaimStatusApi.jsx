import API from '../../Api/Api';
import {GET_CLAIM_STATUS} from '../../Api/ApiPath';

export const getClaimStatusApi = async payload => {
  try {
    const response = await API.post(GET_CLAIM_STATUS, payload);
    //   console.log('GET_CLAIM_STATUS API response:', JSON.stringify(response.data));
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
