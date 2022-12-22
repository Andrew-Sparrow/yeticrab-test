import axios, {AxiosError} from 'axios';

// former place for Data Base
// const BACKEND_URL = 'https://heroku-yeticrab-api.herokuapp.com';

const BACKEND_URL = 'http://localhost:4000/';

const REQUEST_TIMEOUT = 5000;

export const getAxiosInstance = () => {
  const axiosInstance = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT
  });

  axiosInstance.defaults.headers.post['Content-Type'] = 'application/json';

  const onSuccess = (response: any) => {
    return response;
  };

  const onFail = (err: AxiosError | Error) => {
    return Promise.reject(err);
  };

  axiosInstance.interceptors.response.use(onSuccess, onFail);

  return axiosInstance;
};
