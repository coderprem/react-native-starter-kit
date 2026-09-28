import {ApiError} from './apiError';
import GlobalErrorService from './GlobalErrorService';

export class CommonErrorHandler {
  static handle(error: ApiError): boolean {
    switch (error.status) {
      case 401:
        this.handleUnauthorized(error);
        return true;
     case 404:
        this.handleNotFound(error);
        return true;
      case 429:
        this.handleRateLimit(error);
        return true;
      case 500:
        this.handleServerError(error);
        return true;
      case 502:
        this.handleServerError(error);
        return true;
      case 503:
        this.handleServerError(error);
        return true;
      case 504:
        this.handleServerError(error);
        return true;
      default:
        this.handleUnknownError(error);
        return false;
    }
  }
  private static handleNotFound(
    error: ApiError,
  ): void {
    console.log('COMMON ERROR: Not found', error.message);
    GlobalErrorService.show('Not found', error.message);  
  }
  private static handleUnauthorized(
    error: ApiError,
  ): void {
    console.log('COMMON ERROR: Unauthorized', error.message);
    GlobalErrorService.show('Unauthorized', error.message);
  }

  private static handleRateLimit(
    error: ApiError,
  ): void {
    console.log('COMMON ERROR: Too many requests', error.message);
    GlobalErrorService.show('Too many requests', error.message);
    // Show common rate-limit message
  }

  private static handleServerError(
    error: ApiError,
  ): void {
    console.log('COMMON ERROR: Server error', error.message);
    GlobalErrorService.show('Server error', error.message);
    // Show common server error message
  }
  private static handleUnknownError(
    error: ApiError,
  ): void {
    console.log('COMMON ERROR: Unknown error', error.message);
    GlobalErrorService.show('Unknown error', error.message);
    // Show common unknown error message
  }
}