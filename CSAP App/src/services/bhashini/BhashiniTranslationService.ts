import type {BhashiniTranslateRequest} from './BhashiniTypes';

export class BhashiniTranslationService {
  private readonly cache = new Map<string, string>();

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

    console.log(
      '[Bhashini] Translation requested:',
      {
        sourceLanguage,
        targetLanguage,
        count: validTexts.length,
      },
    );

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
        console.log('[Bhashini] CACHE HIT:', {
          text,
          sourceLanguage,
          targetLanguage,
          translation: cachedTranslation,
        });

        results[index] = cachedTranslation;
      } else {
        console.log('[Bhashini] CACHE MISS:', {
          text,
          sourceLanguage,
          targetLanguage,
        });

        textsToTranslate.push(text);
        missingIndexes.push(index);
      }
    });

    // Everything was already available in cache.
    if (!textsToTranslate.length) {
      console.log(
        '[Bhashini] Returning all translations from CACHE',
      );

      return results;
    }

    console.log(
      '[Bhashini] Calling translation API for:',
      textsToTranslate,
    );

    const request: BhashiniTranslateRequest = {
      texts: textsToTranslate,
      sourceLanguage,
      targetLanguage,
    };

    const translations = await this.callTranslationApi(
      request,
    );

    console.log(
      '[Bhashini] API RESPONSE:',
      translations,
    );

    translations.forEach((translation, index) => {
      const originalText = textsToTranslate[index];

      const cacheKey = this.getCacheKey(
        originalText,
        sourceLanguage,
        targetLanguage,
      );

      this.cache.set(cacheKey, translation);

      console.log('[Bhashini] SAVED TO CACHE:', {
        text: originalText,
        translation,
      });

      const resultIndex = missingIndexes[index];

      results[resultIndex] = translation;
    });

    console.log(
      '[Bhashini] Final translations:',
      results,
    );

    return results;
  }

  private async callTranslationApi(
    request: BhashiniTranslateRequest,
  ): Promise<string[]> {
    console.log(
      '[Bhashini] MOCK API REQUEST:',
      request,
    );

    // Simulate network delay.
    await new Promise(resolve =>
      setTimeout(resolve, 500),
    );

    const translations = request.texts.map(text =>
      this.getDummyTranslation(
        text,
        request.sourceLanguage,
        request.targetLanguage,
      ),
    );

    console.log(
      '[Bhashini] MOCK API RESPONSE:',
      translations,
    );

    return translations;
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