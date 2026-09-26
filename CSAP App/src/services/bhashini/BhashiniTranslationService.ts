import type {
  BhashiniTranslateRequest,
  BhashiniTranslateResponse,
} from './BhashiniTypes';

export class BhashiniTranslationService {
  private readonly apiUrl =
    'https://httpbin.org/post';

  private readonly cache = new Map<string, string>();

  /**
   * Translate a single text.
   * @param text - The text to translate.
   * @param sourceLanguage - The source language.
   * @param targetLanguage - The target language.
   * @returns The translated text.
   */
  async translate(
    text: string,
    sourceLanguage: string,
    targetLanguage: string,
  ): Promise<string> {
    if (!text.trim()) {
      return '';
    }

    const result = await this.translateBatch(
      [text],
      sourceLanguage,
      targetLanguage,
    );

    return result[0] ?? text;
  }
  /**
   * Translate multiple texts in a single request.
   * @param texts - The texts to translate.
   * @param sourceLanguage - The source language.
   * @param targetLanguage - The target language.
   * @returns The translated texts.
   */

  async translateBatch(
    texts: string[],
    sourceLanguage: string,
    targetLanguage: string,
  ): Promise<string[]> {
    const validTexts = texts
      .map(text => text.trim())
      .filter(Boolean);

    if (!validTexts.length) {
      return [];
    }

    const results = new Array<string>(validTexts.length);

    const textsToTranslate: string[] = [];
    const missingIndexes: number[] = [];

    validTexts.forEach((text, index) => {
      const cacheKey = this.getCacheKey(
        text,
        sourceLanguage,
        targetLanguage,
      );

      const cachedTranslation = this.cache.get(cacheKey);

      if (cachedTranslation) {
        results[index] = cachedTranslation;
      } else {
        textsToTranslate.push(text);
        missingIndexes.push(index);
      }
    });

    // Everything was already available in cache.
    if (!textsToTranslate.length) {
      return results;
    }
    /**
     * Translate the texts in a single request.
     * @param texts - The texts to translate.
     * @param sourceLanguage - The source language.
     * @param targetLanguage - The target language.
     * @returns The translated texts.
     */
    const request: BhashiniTranslateRequest = {
      texts: textsToTranslate,
      sourceLanguage,
      targetLanguage,
    };

    const response = await fetch(this.apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(
        `Translation request failed: ${response.status}`,
      );
    }

    /*
     * Temporary dummy API response.
     *
     * httpbin only echoes our request.
     * We simulate the translated values below
     * until the real BE/BHASHINI API is available.
     */
    await response.json();

    const translations = textsToTranslate.map(text =>
      this.getDummyTranslation(
        text,
        sourceLanguage,
        targetLanguage,
      ),
    );

    translations.forEach((translation, index) => {
      const originalText = textsToTranslate[index];

      const cacheKey = this.getCacheKey(
        originalText,
        sourceLanguage,
        targetLanguage,
      );

      this.cache.set(cacheKey, translation);

      const resultIndex = missingIndexes[index];

      results[resultIndex] = translation;
    });

    return results;
  }

  private getCacheKey(
    text: string,
    sourceLanguage: string,
    targetLanguage: string,
  ): string {
    return `${sourceLanguage}:${targetLanguage}:${text}`;
  }

  private getDummyTranslation(
    text: string,
    sourceLanguage: string,
    targetLanguage: string,
  ): string {
    if (
      sourceLanguage === 'en' &&
      targetLanguage === 'hi'
    ) {
      //TODO: Remove this once the real API is available.
      const translations: Record<string, string> = {
        'Welcome to CSAP': 'CSAP में आपका स्वागत है',
        'Subscribe now': 'अभी सब्सक्राइब करें',
        'View details': 'विवरण देखें',
        'Continue': 'जारी रखें',
        'Login': 'लॉगिन',
      };

      return translations[text] ?? `[HI] ${text}`;
    }
    return `[${targetLanguage.toUpperCase()}] ${text}`;
  }
}