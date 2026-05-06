import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Component, computed, effect, inject, PLATFORM_ID, signal } from '@angular/core';
import { TranslatePipe } from '../../../pipes/translate.pipe';
import { TranslationService } from '../../../services/translation.service';

type Theme = 'dark' | 'light';

@Component({
  selector: 'app-navbar',
  imports: [TranslatePipe],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  private readonly document = inject(DOCUMENT);
  private readonly translation = inject(TranslationService);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  protected readonly mobileMenuOpen = signal(false);
  private readonly theme = signal<Theme>('dark');
  protected readonly themeToggleLabel = computed(() => {
    const isDark = this.theme() === 'dark';
    const isArabic = this.translation.language() === 'ar';
    if (isArabic) {
      return isDark ? 'فاتح' : 'داكن';
    }
    return isDark ? 'Light' : 'Dark';
  });

  constructor() {
    if (this.isBrowser) {
      const stored = this.readLocalStorage('ui-theme');
      if (stored === 'dark' || stored === 'light') {
        this.theme.set(stored);
      }
    }

    effect(() => {
      if (!this.isBrowser) return;
      const value = this.theme();
      const body = this.document.body;
      body.classList.toggle('theme-dark', value === 'dark');
      body.classList.toggle('theme-light', value === 'light');
      this.saveLocalStorage('ui-theme', value);
    });
  }

  protected closeMenu(): void {
    this.mobileMenuOpen.set(false);
  }

  protected toggleMenu(): void {
    this.mobileMenuOpen.update((status) => !status);
  }

  protected toggleLanguage(): void {
    this.translation.toggleLanguage();
  }

  protected toggleTheme(): void {
    this.theme.update((value) => (value === 'dark' ? 'light' : 'dark'));
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
