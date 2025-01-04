import API from '../../Api/Api';
import {LOGIN} from '../../Api/ApiPath';


export const loginApi = async payload => {
  console.log('LOGIN:', LOGIN, 'PayLoad:', JSON.stringify(payload));

  try {
    const response = await API.post(LOGIN, payload);
    console.log('Login API response:', JSON.stringify(response));

    // Check if the response is correctly structured
    if (!response || !response.data) {
      console.error('Response structure is invalid:', response);
      throw new Error('Invalid response from the server');
    }

    return response.data;  // Return data as expected
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      'Unknown error occurred';
    console.error('API Error:', errorMessage);
    throw new Error(errorMessage); // Pass a meaningful error to the caller
  }
};
