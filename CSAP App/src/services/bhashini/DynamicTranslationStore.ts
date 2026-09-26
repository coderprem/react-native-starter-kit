import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@csap_dynamic_translations';

type TranslationCache = Record<string, string>;

export class DynamicTranslationStore {
  private cache: TranslationCache = {};
  private initialized = false;

  async clear(): Promise<void> {
    this.cache = {};
    this.initialized = false;

    await AsyncStorage.removeItem(STORAGE_KEY);

    console.log(
      '[TranslationStore] Dynamic translation cache cleared',
    );
  }

  async init(): Promise<void> {
    if (this.initialized) {
      return;
    }

    const storedData =
      await AsyncStorage.getItem(STORAGE_KEY);

    if (storedData) {
      this.cache = JSON.parse(storedData);
    }

    this.initialized = true;
  }

  async get(
    text: string,
    sourceLanguage: string,
    targetLanguage: string,
  ): Promise<string | null> {
    await this.init();

    const key = this.getKey(
      text,
      sourceLanguage,
      targetLanguage,
    );

    return this.cache[key] ?? null;
  }

  async set(
    text: string,
    sourceLanguage: string,
    targetLanguage: string,
    translatedText: string,
  ): Promise<void> {
    await this.init();

    const key = this.getKey(
      text,
      sourceLanguage,
      targetLanguage,
    );

    this.cache[key] = translatedText;

    await AsyncStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(this.cache),
    );
  }

  private getKey(
    text: string,
    sourceLanguage: string,
    targetLanguage: string,
  ): string {
    return `${sourceLanguage}:${targetLanguage}:${text.trim()}`;
  }
}

export const translationStore =
  new DynamicTranslationStore();