import {
    ApiConfig,
    post,
  } from '../../network';
  
  export interface LoginRequest {
    subscriberId: string;
  }
  
  export interface LoginResponse {
    token: string;
    userId: string;
  }
  
  export const login = (
    request: LoginRequest,
  ) => {
    return post<
      LoginResponse,
      LoginRequest
    >(
      ApiConfig.DUMMY_API.API,
      request,
    );
  };