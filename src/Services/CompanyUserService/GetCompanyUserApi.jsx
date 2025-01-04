import API from '../../Api/Api';
import {GET_COMAPNY_USERS} from '../../Api/ApiPath';

export const getCompanyUsersApi = async payload => {
  try {
    const response = await API.post(GET_COMAPNY_USERS, payload);
    //   console.log('GET_COMAPNY_USERS API response:', JSON.stringify(response.data));
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
