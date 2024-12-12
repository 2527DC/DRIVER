import axios from 'axios';

// Create an instance of axios
const axiosClient = axios.create({
  baseURL: 'https://gitets.mltcorporate.com/api/', // Replace with your base API URL
  headers: {
    'Content-Type': 'application/json',
    'Authorization':`Bearer 5peSADHRgEMpYX0GoiWzf57vabaaF6iugZSuUQz02LfEN8qry2AGJ43DzqYG`
  },
});

// Optional: Set up request and response interceptors for logging, error handling, etc.
axiosClient.interceptors.request.use(
  
);

axiosClient.interceptors.response.use(
  (response) => {
    // Handle successful response
    return response;
  },
  (error) => {
    // Handle error response
    if (error.response) {
      // Server responded with a status other than 2xx
      console.error(error.response.data);
      console.error(error.response.status);
      console.error(error.response.headers);
    } else if (error.request) {
      // No response was received
      console.error(error.request);
    } else {
      // Something else caused the error
      console.error('Error', error.message);
    }
    return Promise.reject(error);
  }
);


export default axiosClient;
