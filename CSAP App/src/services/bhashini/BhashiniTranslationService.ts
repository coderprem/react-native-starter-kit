export class BhashiniTranslationService {
  async translate(
    text: string,
    sourceLanguage: string,
    targetLanguage: string,
  ): Promise<string> {
    if (!text.trim()) {
      return '';
    }

    // BHASHINI API call
    return text;
  }
}