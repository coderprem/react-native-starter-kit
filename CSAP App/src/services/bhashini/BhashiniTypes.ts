export interface BhashiniTranslateRequest {
  texts: string[];
  sourceLanguage: string;
  targetLanguage: string;
}

export interface BhashiniTranslateResponse {
  translations: string[];
}