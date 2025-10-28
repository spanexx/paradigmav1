import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, effect, signal } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

type NebularThemeName = 'default' | 'dark';
export type ParadigmaTheme = 'light' | 'dark';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private static readonly STORAGE_KEY = 'paradigma-theme';
  private static readonly DARK_CLASS = 'dark';
  private readonly themeSignal = signal<ParadigmaTheme>('light');
  private readonly mediaQuery = this.supportsMatchMedia
    ? window.matchMedia('(prefers-color-scheme: dark)')
    : undefined;
  private initialized = false;

  constructor(@Inject(DOCUMENT) private readonly document: Document, private readonly nbTheme: NbThemeService) {
    effect(() => {
      const theme = this.themeSignal();
      this.applyDocumentClasses(theme);
      this.switchNebularTheme(theme);
    });
  }

  initialize(): void {
    if (this.initialized) {
      return;
    }

    const initialTheme = this.loadStoredTheme() ?? this.detectSystemTheme();
    this.themeSignal.set(initialTheme);
    this.persistTheme(initialTheme);
    this.registerSystemListener();
    this.initialized = true;
    console.debug('[ThemeService] initialized', { theme: initialTheme });
  }

  toggleTheme(): void {
    const nextTheme: ParadigmaTheme = this.themeSignal() === 'dark' ? 'light' : 'dark';
    this.setTheme(nextTheme);
  }

  setTheme(theme: ParadigmaTheme): void {
    this.themeSignal.set(theme);
    this.persistTheme(theme);
    console.debug('[ThemeService] theme updated', { theme });
  }

  currentTheme(): ParadigmaTheme {
    return this.themeSignal();
  }

  isDarkTheme(): boolean {
    return this.themeSignal() === 'dark';
  }

  private applyDocumentClasses(theme: ParadigmaTheme): void {
    const html = this.document?.documentElement;
    if (!html) {
      return;
    }

    if (theme === 'dark') {
      html.classList.add(ThemeService.DARK_CLASS);
    } else {
      html.classList.remove(ThemeService.DARK_CLASS);
    }
  }

  private switchNebularTheme(theme: ParadigmaTheme): void {
    const nebularTheme: NebularThemeName = theme === 'dark' ? 'dark' : 'default';
    this.nbTheme.changeTheme(nebularTheme);
  }

  private loadStoredTheme(): ParadigmaTheme | null {
    if (!this.supportsLocalStorage) {
      return null;
    }
    const stored = window.localStorage.getItem(ThemeService.STORAGE_KEY);
    return stored === 'dark' || stored === 'light' ? stored : null;
  }

  private persistTheme(theme: ParadigmaTheme): void {
    if (!this.supportsLocalStorage) {
      return;
    }
    window.localStorage.setItem(ThemeService.STORAGE_KEY, theme);
  }

  private detectSystemTheme(): ParadigmaTheme {
    if (!this.mediaQuery) {
      return 'light';
    }
    return this.mediaQuery.matches ? 'dark' : 'light';
  }

  private registerSystemListener(): void {
    if (!this.mediaQuery) {
      return;
    }

    const listener = (event: MediaQueryListEvent) => {
      if (this.loadStoredTheme()) {
        return;
      }
      const nextTheme: ParadigmaTheme = event.matches ? 'dark' : 'light';
      this.themeSignal.set(nextTheme);
      console.debug('[ThemeService] system preference changed', { theme: nextTheme });
    };

    this.mediaQuery.addEventListener('change', listener);
  }

  private get supportsLocalStorage(): boolean {
    return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
  }

  private get supportsMatchMedia(): boolean {
    return typeof window !== 'undefined' && typeof window.matchMedia !== 'undefined';
  }
}
