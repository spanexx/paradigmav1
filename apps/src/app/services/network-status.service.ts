import { DestroyRef, Injectable, computed, effect, inject, signal } from '@angular/core';
import { HeroContent, HeroStat } from '../pages/landing/landing.content';
import { Metric } from '../models/landing';

interface LandingCachePayload {
  readonly hero: HeroContent;
  readonly heroStats: ReadonlyArray<HeroStat>;
  readonly metrics: ReadonlyArray<Metric>;
  readonly cachedAt: string;
}

@Injectable({ providedIn: 'root' })
export class NetworkStatusService {
  private static readonly LANDING_CACHE_KEY = 'paradigma-landing-cache';

  private readonly destroyRef = inject(DestroyRef);
  private readonly offlineSignal = signal(!this.navigatorOnline);
  private readonly cachedAtSignal = signal<string | null>(this.readCachedAt());

  readonly offline = computed(() => this.offlineSignal());
  readonly cachedAt = computed(() => this.cachedAtSignal());

  private readonly goOnline = () => {
    this.offlineSignal.set(false);
    console.debug('[NetworkStatusService] online');
  };

  private readonly goOffline = () => {
    this.offlineSignal.set(true);
    console.debug('[NetworkStatusService] offline');
  };

  constructor() {
    if (this.isBrowser) {
      window.addEventListener('online', this.goOnline);
      window.addEventListener('offline', this.goOffline);
      this.destroyRef.onDestroy(() => {
        window.removeEventListener('online', this.goOnline);
        window.removeEventListener('offline', this.goOffline);
      });
    }

    effect(() => {
      if (this.offline()) {
        console.debug('[NetworkStatusService] offline signal detected');
      }
    });
  }

  cacheLandingPayload(payload: { hero: HeroContent; heroStats: ReadonlyArray<HeroStat>; metrics: ReadonlyArray<Metric> }): void {
    if (!this.supportsLocalStorage) {
      return;
    }

    const cachedAt = new Date().toISOString();
    const envelope: LandingCachePayload = { ...payload, cachedAt };

    try {
      window.localStorage.setItem(NetworkStatusService.LANDING_CACHE_KEY, JSON.stringify(envelope));
      this.cachedAtSignal.set(cachedAt);
      console.debug('[NetworkStatusService] landing payload cached', { cachedAt });
    } catch (error) {
      console.warn('[NetworkStatusService] failed to cache landing payload', error);
    }
  }

  cachedLandingPayload(): LandingCachePayload | null {
    if (!this.supportsLocalStorage) {
      return null;
    }

    try {
      const raw = window.localStorage.getItem(NetworkStatusService.LANDING_CACHE_KEY);
      if (!raw) {
        return null;
      }
      return JSON.parse(raw) as LandingCachePayload;
    } catch (error) {
      console.warn('[NetworkStatusService] failed to read cached landing payload', error);
      return null;
    }
  }

  private get navigatorOnline(): boolean {
    return this.isBrowser ? window.navigator.onLine : true;
  }

  private get isBrowser(): boolean {
    return typeof window !== 'undefined';
  }

  private get supportsLocalStorage(): boolean {
    return this.isBrowser && typeof window.localStorage !== 'undefined';
  }

  private readCachedAt(): string | null {
    const cached = this.cachedLandingPayload();
    return cached?.cachedAt ?? null;
  }
}
