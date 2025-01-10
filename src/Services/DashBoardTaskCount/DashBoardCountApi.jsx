import API from '../../Api/Api';
import {DASHBOARD_TASK_COUNT} from '../../Api/ApiPath';


export const dashboardCountApi = async payload => {
    // console.log('getTaskStatus:', DASHBOARD_TASK_COUNT, 'PayLoad:', JSON.stringify(payload));
  
    try {
      const response = await API.post(DASHBOARD_TASK_COUNT, payload);
    //   console.log('DASHBOARD_TASK_COUNT API response:', JSON.stringify(response.data));
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
  

  