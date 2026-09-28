export class ApiConfig {
  
    //TODO: Remove this after the real API is available.
    static readonly DUMMY_API = {
      API: '/posts'
    }
    static readonly AUTH = {
      LOGIN: '/posts',
      VERIFY_OTP: '/auth/verify-otp',
    };
  
    static readonly USER = {
      PROFILE: '/user/profile',
      UPDATE_PROFILE: '/user/profile',
    };
  
    static readonly CONTENT = {
      HOME: '/content/home',
      SEARCH: '/content/search',
    };
  }
