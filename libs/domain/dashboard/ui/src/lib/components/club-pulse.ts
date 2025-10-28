/**
 * Club Pulse Component
 * 
 * This component displays recent activity and updates from various investment clubs.
 * It shows club names, recent headlines, required actions, and timestamps.
 * 
 * This is a standalone component that can be used within other components.
 */
import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule, NgFor, NgClass } from '@angular/common';
import { ClubPulseItem } from '@paradigma/dashboard-data';

const avatarClassMap: Record<ClubPulseItem['avatarColor'], string> = {
  sky: 'avatar-variant-sky',
  emerald: 'avatar-variant-emerald',
  amber: 'avatar-variant-amber',
  violet: 'avatar-variant-violet',
};

@Component({
  selector: 'lib-club-pulse',
  standalone: true,  // This marks the component as standalone, meaning it doesn't require a NgModule
  imports: [CommonModule, NgFor, NgClass],  // Import required modules and directives
  template: `
<section class="club-pulse-shell">
  <header class="club-header">
    <div>
      <h2 class="font-display club-header-title">Club pulse</h2>
      <p class="club-header-copy">Track collaboration signals across investment clubs.</p>
    </div>
    <button class="club-view-all" type="button">View all</button>
  </header>

  <ul class="club-list">
    <li
      *ngFor="let club of pulse; trackBy: trackByClub"
      class="club-item flex items-center gap-4 p-4"
    >
      <div
        class="avatar relative flex h-12 w-12 items-center justify-center rounded-full avatar-initials"
        [ngClass]="avatarClassMap[club.avatarColor]"
      >
        <span class="text-sm font-semibold">{{ club.name | slice:0:2 }}</span>
      </div>
      <div class="flex-1 space-y-1 text-sm">
        <p class="club-name">{{ club.name }}</p>
        <p class="club-headline">{{ club.headline }}</p>
        <div class="club-meta flex items-center justify-between text-xs">
          <span class="club-action">{{ club.action }}</span>
          <span class="club-time">{{ club.time }}</span>
        </div>
      </div>
    </li>
  </ul>
</section>

  `,  // Inline HTML template for the component
  styleUrl: './club-pulse.scss',    // Styles for the component
  changeDetection: ChangeDetectionStrategy.OnPush,  // Optimize change detection
})
export class ClubPulse implements OnChanges {
  // Input property to receive club pulse data from parent components
  @Input({ required: true }) pulse: ReadonlyArray<ClubPulseItem> = [];

  /**
   * Lifecycle hook called when any input properties change
   * Used here for debugging purposes to track when data updates occur
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['pulse']) {
      console.debug('[ClubPulseComponent] pulse updated', { total: this.pulse.length });
    }
  }

  /**
   * TrackBy function for club pulse items to improve rendering performance
   */
  protected trackByClub = (_: number, item: ClubPulseItem): string => item.name;

  protected readonly avatarClassMap = avatarClassMap;
}
