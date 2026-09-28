import axios, { AxiosRequestConfig } from 'axios';
import { Platform } from 'react-native';
import { IS_TABLET } from '../utils/device';
import { generateCurl } from './networkManager';
import { ApiError } from './apiError';
import { log } from '../utils/logger';

export const API_SUCCESS_CODE = 0;

export const apiClient = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 15000,
});

//TODO: Uncomment this when the real API is available.
// apiClient.interceptors.request.use(async (config) => {

//   config.headers['Accept-Encoding'] = 'gzip';
//   config.headers['User-Agent'] = 'okhttp/4.10.0';
//   config.headers['Content-Type'] = 'application/json';
//   config.headers['platform'] = Platform.OS;
//   config.headers['isTablet'] = IS_TABLET;

//   const curl = generateCurl(config);
//   log('API_CURL:\n', curl);
//   return config;
// });

// apiClient.interceptors.response.use(
//   (response) => {
//     const data = response.data;
//     log('API_RESPONSE:', data);

//     if (typeof data?.code !== 'undefined') {
//       if (data.code !== API_SUCCESS_CODE) {
//         throw new ApiError({
//           message: data.message,
//           localizedMessage: data.localizedMessage,
//           code: data.code,
//           status: response.status,
//           data: data.data,
//         });
//       }

//       return response;
//     }

//     if (!data || data.message) {
//       throw new ApiError({
//         message: data?.message || 'Unknown error',
//         status: response.status,
//       });
//     }

//     return response;
//   },
//   (error) => {
//     log('API_ERROR:', error?.response?.data);
//     const status = error?.response?.status;
//     const data = error?.response?.data;

//     throw new ApiError({
//       message: data?.message || error.message || 'Something went wrong',
//       localizedMessage: data?.localizedMessage || 'Something went wrong',
//       code: data?.code,
//       status,
//       data,
//     });

//   }
  
// );

export const get = async <T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<T> => {
  const response = await apiClient.get<T>(
    url,
    config,
  );

  return response.data;
};

export const post = async <T, B = unknown>(
  url: string,
  body?: B,
  config?: AxiosRequestConfig,
): Promise<T> => {
  const response = await apiClient.post<T>(
    url,
    body,
    config,
  );

  console.log('API_URL:', response.config.baseURL);
  return response.data;
};

export const put = async <T, B = unknown>(
  url: string,
  body?: B,
  config?: AxiosRequestConfig,
): Promise<T> => {
  const response = await apiClient.put<T>(
    url,
    body,
    config,
  );
  console.log('API_URL:', response.config.baseURL);

  return response.data;
};

export const patch = async <T, B = unknown>(
  url: string,
  body?: B,
  config?: AxiosRequestConfig,
): Promise<T> => {
  const response = await apiClient.patch<T>(
    url,
    body,
    config,
  );

  console.log('API_URL:', response.config.baseURL);
  return response.data;
};

export const remove = async <T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<T> => {
  const response = await apiClient.delete<T>(
    url,
    config,
  );

  console.log('API_URL:', response.config.baseURL);
  return response.data;
};
