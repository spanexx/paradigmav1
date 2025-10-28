/**
 * Hero Component
 * 
 * This component displays the hero section at the top of the dashboard.
 * It shows an eyebrow title, main title, descriptive message, and key highlights.
 * It also includes the wallet panel which displays wallet and rewards information.
 * 
 * This is a standalone component that can be used independently.
 */
import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { DashboardHero, RewardsSnapshot, WalletSnapshot } from '@paradigma/dashboard-data';
import { WalletPanel } from './wallet-panel';

type DeltaIcon = 'north_east' | 'south_east' | 'horizontal_rule';

interface HighlightDelta {
  readonly icon: DeltaIcon;
  readonly text: string;
}

@Component({
  selector: 'lib-hero',
  standalone: true,  // This marks the component as standalone, meaning it doesn't require a NgModule
  imports: [CommonModule, WalletPanel, MatIconModule],  // Import required modules and components
  template: `
<section class="hero-shell">
  <div class="hero-content">
    <div class="hero-summary">
      <p class="hero-eyebrow">{{ hero.eyebrow }}</p>
      <h1 class="hero-title">{{ hero.title }}</h1>
      <p class="hero-copy">{{ hero.message }}</p>

      <div class="hero-highlights">
        <article class="highlight primary">
          <dt>{{ hero.highlight.label }}</dt>
          <dd>{{ hero.highlight.value }}</dd>
          <span class="highlight-delta" *ngIf="primaryDelta.text">
            <mat-icon *ngIf="primaryDelta.icon !== 'horizontal_rule'" class="highlight-delta-icon">{{ primaryDelta.icon }}</mat-icon>
            <span>{{ primaryDelta.text }}</span>
          </span>
        </article>

        <article class="highlight secondary">
          <dt>{{ hero.secondHighlight.label }}</dt>
          <dd>{{ hero.secondHighlight.value }}</dd>
          <span class="highlight-delta" *ngIf="secondaryDelta.text">
            <mat-icon *ngIf="secondaryDelta.icon !== 'horizontal_rule'" class="highlight-delta-icon">{{ secondaryDelta.icon }}</mat-icon>
            <span>{{ secondaryDelta.text }}</span>
          </span>
        </article>
      </div>
    </div>

    <lib-wallet-panel [wallet]="wallet" [rewards]="rewards"></lib-wallet-panel>
  </div>
</section>

  `,  // Inline HTML template for the component
  styleUrl: './hero.scss',    // Styles for the component
  changeDetection: ChangeDetectionStrategy.OnPush,  // Optimize change detection
})
export class Hero implements OnChanges {
  // Input properties to receive data from parent components
  @Input({ required: true }) hero!: DashboardHero;      // Hero section data
  @Input({ required: true }) wallet!: WalletSnapshot;   // Wallet snapshot data
  @Input({ required: true }) rewards!: RewardsSnapshot; // Rewards snapshot data

  protected primaryDelta: HighlightDelta = { icon: 'horizontal_rule', text: '' };
  protected secondaryDelta: HighlightDelta = { icon: 'horizontal_rule', text: '' };

  /**
   * Lifecycle hook called when any input properties change
   * Used here for debugging purposes to track when data updates occur
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['hero']) {
      console.debug('[HeroComponent] hero updated', changes['hero'].currentValue);
      if (this.hero) {
        this.primaryDelta = this.interpretDelta(this.hero.highlight?.delta);
        this.secondaryDelta = this.interpretDelta(this.hero.secondHighlight?.delta);
      }
    }
    if (changes['wallet']) {
      console.debug('[HeroComponent] wallet updated', changes['wallet'].currentValue);
    }
    if (changes['rewards']) {
      console.debug('[HeroComponent] rewards updated', changes['rewards'].currentValue);
    }
  }

  private interpretDelta(delta?: string): HighlightDelta {
    if (!delta) {
      return { icon: 'horizontal_rule', text: '' };
    }

    let text = delta.trim();
    if (!text) {
      return { icon: 'horizontal_rule', text: '' };
    }

    let icon: DeltaIcon = 'horizontal_rule';

    if (text.startsWith('↑')) {
      icon = 'north_east';
      text = text.slice(1).trimStart();
    } else if (text.startsWith('↓')) {
      icon = 'south_east';
      text = text.slice(1).trimStart();
    }

    if (text.startsWith('+')) {
      icon = 'north_east';
    } else if (text.startsWith('-')) {
      icon = 'south_east';
    } else if (/gain|up|increase/i.test(text)) {
      icon = 'north_east';
    } else if (/drop|down|decrease|loss/i.test(text)) {
      icon = 'south_east';
    }

    return { icon, text };
  }
}
