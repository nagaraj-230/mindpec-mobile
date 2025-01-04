import API from '../../Api/Api';
import {
  GET_TASK_STATUS_HISTORY,
  UPDATE_TASK_STATUS_HISTORY,
} from '../../Api/ApiPath';

// export const getTaskStatusHistoryApi = async payload => {
//   try {
//     const response = await API.post(GET_TASK_STATUS_HISTORY, payload);
//       console.log('GET_TASK_STATUS_HISTORY API response:', JSON.stringify(response));
//     return response.data;
//   } catch (error) {
//     const errorMessage =
//       error.response?.data?.message ||
//       error.message ||
//       'Unknown error occurred';
//     console.error('API Error:', errorMessage);
//     throw new Error(errorMessage); 
//   }
// };
export const getTaskStatusHistoryApi = async (payload) => {
  // console.log("API : "+GET_TASK_STATUS_HISTORY+ " Payload ::"+JSON.stringify(payload))
  try {
    const response = await API.post(GET_TASK_STATUS_HISTORY, payload);
    console.log('API Response:', JSON.stringify(response.data));
    return response.data; // Ensure only the response.data is returned
  } catch (error) {
    console.error('API Error:', error.message);
    throw error;
  }
};


export const updatedTaskStatusHistoryApi = async payload => {

  try {
    const response = await API.post(UPDATE_TASK_STATUS_HISTORY, payload);
      console.log('UPDATE_TASK_STATUS_HISTORY API response:', JSON.stringify(response.data));
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
