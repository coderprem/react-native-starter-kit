type ErrorListener = (
    title: string,
    message: string,
  ) => void;
  
  class GlobalErrorService {
    private static listener: ErrorListener | null = null;
  
    static setListener(
      listener: ErrorListener,
    ): void {
      GlobalErrorService.listener = listener;
    }
  
    static clearListener(): void {
      GlobalErrorService.listener = null;
    }
  
    static show(
      title: string,
      message: string,
    ): void {
      GlobalErrorService.listener?.(
        title,
        message,
      );
    }
  }
  
  export default GlobalErrorService;