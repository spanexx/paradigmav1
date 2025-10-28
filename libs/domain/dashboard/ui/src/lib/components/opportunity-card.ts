/**
 * Opportunity Card Component
 * 
 * This component displays an individual opportunity card with details
 * like title, tag, IRR, horizon, amount committed, and an image.
 * It uses utility functions to determine appropriate styling for badges.
 * 
 * This is a standalone component that can be used within other components.
 */
import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { OpportunityCard as OpportunityCardModel } from '@paradigma/dashboard-data';
import { badgeClass } from '@paradigma/dashboard-utils';

@Component({
  selector: 'lib-opportunity-card',
  standalone: true,  // This marks the component as standalone, meaning it doesn't require a NgModule
  imports: [CommonModule, NgClass],  // Import required directives and modules
  template: 
  `
<article class="opportunity-card overflow-hidden rounded-2xl transition hover:-translate-y-1">
  <div class="h-36 w-full bg-cover bg-center" [style.background-image]="'url(' + opportunity.image + ')'" role="img" aria-hidden="true"></div>

  <div class="space-y-3 p-4">
    <div class="flex items-center justify-between">
      <h3 class="card-title font-semibold">{{ opportunity.title }}</h3>
      <span class="rounded-full px-3 py-0.5 text-xs font-semibold" [ngClass]="badgeClass(opportunity.tagVariant)">{{ opportunity.tag }}</span>
    </div>

    <p class="card-meta text-sm">{{ opportunity.irr }} · {{ opportunity.horizon }}</p>
    <p class="card-positive text-xs font-medium">{{ opportunity.committed }}</p>
  </div>
</article>

  `,  // Inline HTML template for the component
  styleUrl: './opportunity-card.scss',    // Styles for the component
  changeDetection: ChangeDetectionStrategy.OnPush,  // Optimize change detection
})
export class OpportunityCard implements OnChanges {
  // Input property to receive opportunity data from parent components
  @Input({ required: true }) opportunity!: OpportunityCardModel;
  // Make the badgeClass utility function available in the template
  protected readonly badgeClass = badgeClass;

  /**
   * Lifecycle hook called when any input properties change
   * Used here for debugging purposes to track when data updates occur
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['opportunity']) {
      console.debug('[OpportunityCardComponent] opportunity updated', changes['opportunity'].currentValue);
    }
  }
}
