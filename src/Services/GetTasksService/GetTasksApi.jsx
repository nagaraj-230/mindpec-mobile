import API from '../../Api/Api';
import {GET_TASKS, UPDATE_TASKS} from '../../Api/ApiPath';

export const getTasksApi = async payload => {
  console.log('GET_TASKS Payload:', payload); 
  try {
    const response = await API.post(GET_TASKS, payload);
    //   console.log('GET_TASKS API response:', JSON.stringify(response.data));
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

export const updateTasksApi = async payload => {
  try {
    const response = await API.post(UPDATE_TASKS, payload);
    //   console.log('UPDATE_TASKS API response:', JSON.stringify(response.data));
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
