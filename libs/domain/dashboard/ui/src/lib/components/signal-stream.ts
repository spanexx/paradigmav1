/**
 * Signal Stream Component
 * 
 * This component displays a stream of activity events categorized by type
 * (portfolio, compliance, liquidity, support). It shows recent activities
 * with titles, details, timestamps, and applies type-specific styling.
 * 
 * This is a standalone component that can be used within other components.
 */
import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule, NgFor, NgClass } from '@angular/common';
import { ActivityEvent } from '@paradigma/dashboard-data';
import { streamClass } from '@paradigma/dashboard-utils';

@Component({
  selector: 'lib-signal-stream',
  standalone: true,  // This marks the component as standalone, meaning it doesn't require a NgModule
  imports: [CommonModule, NgFor, NgClass],  // Import required modules and directives
  template: `
<section class="signal-shell rounded-3xl p-6">
  <h2 class="font-display signal-title text-xl font-semibold">Signal stream</h2>

  <div class="mt-4 space-y-4">
    <article
      *ngFor="let activity of activityStream; trackBy: trackByActivity"
      class="signal-item flex flex-col gap-2 rounded-2xl p-4"
    >
      <div class="flex items-center justify-between">
        <h3 class="signal-item-title font-medium">{{ activity.title }}</h3>
        <span class="signal-item-time text-xs">{{ activity.time }}</span>
      </div>
      <p class="signal-item-detail text-sm">{{ activity.detail }}</p>
      <span class="badge signal-type w-fit" [ngClass]="streamClass(activity.type)">{{ activity.type }}</span>
    </article>
  </div>
</section>

  `,  // Inline HTML template for the component
  styleUrl: './signal-stream.scss',    // Styles for the component
  changeDetection: ChangeDetectionStrategy.OnPush,  // Optimize change detection
})
export class SignalStream implements OnChanges {
  // Input property to receive activity stream data from parent components
  @Input({ required: true }) activityStream: ReadonlyArray<ActivityEvent> = [];
  // Make the streamClass utility function available in the template for type-specific styling
  protected readonly streamClass = streamClass;

  /**
   * Lifecycle hook called when any input properties change
   * Used here for debugging purposes to track when data updates occur
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['activityStream']) {
      console.debug('[SignalStreamComponent] activity stream updated', {
        total: this.activityStream.length,
      });
    }
  }

  /**
   * TrackBy function for activity events to improve rendering performance
   */
  protected trackByActivity = (_: number, activity: ActivityEvent): string => `${activity.type}-${activity.title}`;
}
