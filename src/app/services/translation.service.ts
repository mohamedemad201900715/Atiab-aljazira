import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { computed, effect, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import en from '../../assets/i18n/en.json';
import ar from '../../assets/i18n/ar.json';
import { TranslationModel } from '../models/translation.model';

type Language = 'en' | 'ar';

const DICTIONARIES: Record<Language, TranslationModel> = {
  en: en as TranslationModel,
  ar: ar as TranslationModel,
};

@Injectable({ providedIn: 'root' })
export class TranslationService {
  private readonly document = inject(DOCUMENT);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  readonly language = signal<Language>('en');
  private readonly dictionary = computed<TranslationModel>(() => DICTIONARIES[this.language()]);
  readonly direction = computed<'rtl' | 'ltr'>(() => (this.language() === 'ar' ? 'rtl' : 'ltr'));

  constructor() {
    if (this.isBrowser) {
      const stored = this.readLocalStorage('ui-language');
      if (stored === 'en' || stored === 'ar') {
        this.language.set(stored);
      } else {
        const urlLang = new URLSearchParams(window.location.search).get('lang');
        if (urlLang === 'ar' || urlLang === 'en') {
          this.language.set(urlLang);
        }
      }
    }

    effect(() => {
      const lang = this.language();
      const html = this.document.documentElement;
      html.lang = lang;
      html.dir = lang === 'ar' ? 'rtl' : 'ltr';
      if (this.isBrowser) {
        this.saveLocalStorage('ui-language', lang);
      }
    });
  }

  toggleLanguage(): void {
    this.language.update((value) => (value === 'en' ? 'ar' : 'en'));
  }

  t(path: string): unknown {
    const value = path.split('.').reduce<unknown>((acc, part) => {
      if (acc && typeof acc === 'object') {
        return (acc as Record<string, unknown>)[part];
      }
      return undefined;
    }, this.dictionary());
    return value === undefined ? path : value;
  }

  private readLocalStorage(key: string): string | null {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  }

  private saveLocalStorage(key: string, value: string): void {
    try {
      localStorage.setItem(key, value);
    } catch {
      // No-op when storage is unavailable.
    }
  }
}
