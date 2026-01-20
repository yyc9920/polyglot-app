import { GREETINGS } from './greetings';
import { ESSENTIALS } from './essentials';
import { TRAVEL } from './travel';
import { SHOPPING } from './shopping';
import { DINING } from './dining';
import { NUMBERS_AND_TIME } from './numbers';
import { EMERGENCY_AND_MISC } from './emergency_misc';
import type { DictionaryEntry } from '../../types/dictionary';

export const PHRASE_DICTIONARY: DictionaryEntry[] = [
  ...GREETINGS,
  ...ESSENTIALS,
  ...TRAVEL,
  ...SHOPPING,
  ...DINING,
  ...NUMBERS_AND_TIME,
  ...EMERGENCY_AND_MISC
];

export * from './greetings';
export * from './essentials';
export * from './travel';
export * from './shopping';
export * from './dining';
export * from './numbers';
export * from './emergency_misc';
