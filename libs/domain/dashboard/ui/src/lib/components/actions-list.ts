/**
 * Actions List Component
 * 
 * This component displays a list of action items that require user attention.
 * It includes filtering capabilities to show actions by category.
 * Emits events when the user selects a different filter.
 * 
 * This is a standalone component that can be used within other components.
 */
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule, NgClass, NgFor } from '@angular/common';
import { ActionCategory, ActionItem } from '@paradigma/dashboard-data';

@Component({
  selector: 'lib-actions-list',
  standalone: true,  // This marks the component as standalone, meaning it doesn't require a NgModule
  imports: [CommonModule, NgFor, NgClass],  // Import required directives and modules
  template:
  `
  <section class="actions-shell space-y-6 rounded-3xl p-6">
  <header class="flex flex-wrap items-center justify-between gap-4">
    <div>
      <h2 class="font-display actions-title">Upcoming actions</h2>
      <p class="actions-subtitle text-sm">Focus on the workflows that unblock capital and compliance.</p>
    </div>

    <nav class="flex flex-wrap gap-2" aria-label="Action filters">
      <button
        *ngFor="let filter of filters; trackBy: trackByFilter"
        type="button"
        class="filter-button px-4 py-1.5 text-xs font-semibold"
        [class.is-active]="filter === activeFilter"
        (click)="onFilterClicked(filter)"
      >
        {{ filter }}
      </button>
    </nav>
  </header>

  <div class="grid gap-4 lg:grid-cols-2">
    <article
      *ngFor="let action of actions; trackBy: trackByAction"
      class="action-card group rounded-2xl p-5 transition hover:-translate-y-0.5"
    >
      <div class="flex items-start gap-3">
        <span class="action-icon material-symbols-outlined mt-0.5 flex h-10 w-10 items-center justify-center rounded-xl">
          {{ action.icon }}
        </span>
        <div class="space-y-2">
          <h3 class="action-title font-medium">{{ action.title }}</h3>
          <p class="action-meta text-sm">{{ action.meta }}</p>
          <p class="action-due text-xs font-semibold uppercase tracking-widest">{{ action.due }}</p>
        </div>
      </div>
    </article>
  </div>
</section>

  `,
  styleUrl: './actions-list.scss',    // Styles for the component
  changeDetection: ChangeDetectionStrategy.OnPush,  // Optimize change detection
})
export class ActionsList implements OnChanges {
  // Input properties to receive data from parent components
  @Input({ required: true }) filters: ReadonlyArray<ActionCategory> = [];  // Available filter options
  @Input({ required: true }) activeFilter!: ActionCategory;                // Currently selected filter
  @Input({ required: true }) actions: ReadonlyArray<ActionItem> = [];      // List of action items to display
  
  // Output event to notify parent component when filter changes
  @Output() filterChange = new EventEmitter<ActionCategory>();

  /**
   * Lifecycle hook called when any input properties change
   * Used here for debugging purposes to track when data updates occur
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['activeFilter']) {
      console.debug('[ActionsListComponent] active filter updated', changes['activeFilter'].currentValue);
    }
  }

  /**
   * Handler for when a filter is clicked
   * Emits the selected filter to notify parent components
   */
  protected onFilterClicked(filter: ActionCategory): void {
    this.filterChange.emit(filter);
  }

  /**
   * TrackBy function for filters to improve rendering performance
   */
  protected trackByFilter = (_: number, filter: ActionCategory): string => filter;

  /**
   * TrackBy function for action items to improve rendering performance
   */
  protected trackByAction = (_: number, action: ActionItem): string => `${action.category}-${action.title}`;
}
