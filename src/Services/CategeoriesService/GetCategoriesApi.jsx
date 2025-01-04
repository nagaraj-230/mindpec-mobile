import API from '../../Api/Api';
import {GET_CATEGORIES} from '../../Api/ApiPath';


export const getCategoriesApi = async payload => {
    // console.log('getTaskStatus:', GET_CATEGORIES, 'PayLoad:', JSON.stringify(payload));
  
    try {
      const response = await API.post(GET_CATEGORIES, payload);
    //   console.log('GET_CATEGORIES API response:', JSON.stringify(response.data));
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
  