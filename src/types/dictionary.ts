export type LanguageCode = 'en' | 'es' | 'fr' | 'ja' | 'de' | 'ko' | 'it' | 'zh' | 'pt' | 'hi';

export interface DictionaryEntry {
  id: string;
  tags: string[];
  translations: Record<LanguageCode, { text: string; pron?: string }>;
}
