export interface BhashiniTranslateRequest {
    text: string;
    sourceLanguage: string;
    targetLanguage: string;
  }
  
  export interface BhashiniTranslateResponse {
    translatedText: string;
  }