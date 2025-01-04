import API from '../../Api/Api';
import {GET_TASK_ASSIGNMENTs} from '../../Api/ApiPath';


export const getTaskAssignmentApi = async payload => {
    // console.log('getTaskStatus:', GET_TASK_ASSIGNMENTs, 'PayLoad:', JSON.stringify(payload));
  
    try {
      const response = await API.post(GET_TASK_ASSIGNMENTs, payload);
    //   console.log('GET_TASK_ASSIGNMENTs API response:', JSON.stringify(response.data));
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
  