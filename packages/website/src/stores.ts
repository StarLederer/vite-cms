import { writable } from 'svelte/store';
import locales from './locales';

export type I18n = {
  current: string;
  locales: string[];
};

export const i18n = writable<I18n>({
  current: locales[0],
  locales,
});
