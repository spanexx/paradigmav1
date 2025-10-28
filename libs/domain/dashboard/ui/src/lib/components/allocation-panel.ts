/**
 * Allocation Panel Component
 * 
 * This component displays portfolio allocation information, liquidity windows,
 * and governance checks in a unified panel. It shows how assets are distributed
 * across different categories, upcoming liquidity events, and governance status.
 * 
 * This is a standalone component that can be used within other components.
 */
import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { GovernanceCheck, HoldingsSlice, LiquidityWindow } from '@paradigma/dashboard-data';

@Component({
  selector: 'lib-allocation-panel',
  standalone: true,  // This marks the component as standalone, meaning it doesn't require a NgModule
  imports: [CommonModule, NgFor],  // Import required modules and directives
  template: `
<section class="allocation-shell">
  <div class="allocation-content">
    <div class="allocation-summary">
      <h2 class="font-display allocation-title">Portfolio mix</h2>
      <p class="allocation-subtitle">Track allocation drift and rebalance bands across asset classes.</p>

      <ul class="allocation-list">
        <li
          *ngFor="let slice of allocation; trackBy: trackByLabel"
          class="allocation-item"
        >
          <span class="allocation-label">{{ slice.label }}</span>
          <span class="allocation-weight">
            {{ slice.weight }}%
            · <span class="allocation-change">{{ slice.change }}</span>
          </span>
        </li>
      </ul>
    </div>

    <div class="allocation-side">
      <div class="liquidity-window">
        <h3 class="allocation-side-title">Liquidity windows</h3>
        <div class="liquidity-stream">
          <div *ngFor="let window of liquidityWindows; trackBy: trackByWindow" class="liquidity-entry">
            <div class="liquidity-meta">
              <span class="liquidity-asset">{{ window.asset }}</span>
              <span>{{ window.window }}</span>
            </div>
            <div class="liquidity-progress-copy">
              <span>{{ window.amount }}</span>
              <span>{{ window.progress }}%</span>
            </div>
            <div class="progress-track">
              <div class="progress-bar" [style.width.%]="window.progress"></div>
            </div>
          </div>
        </div>
      </div>

      <div class="governance-card">
        <h3 class="allocation-side-title">Governance checks</h3>
        <ul class="governance-list">
          <li *ngFor="let check of governanceChecks; trackBy: trackByCheck" class="governance-item">
            <div class="governance-header">
              <span class="governance-title">{{ check.title }}</span>
              <span class="governance-status" [ngClass]="check.status === 'on-track' ? 'status-positive' : 'status-warning'">
                {{ check.status === 'on-track' ? 'On track' : 'At risk' }}
              </span>
            </div>
            <p class="governance-detail">{{ check.detail }}</p>
            <p class="governance-owner">{{ check.owner }}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</section>

  `,  // Inline HTML template for the component
  styleUrl: './allocation-panel.scss',    // Styles for the component
  changeDetection: ChangeDetectionStrategy.OnPush,  // Optimize change detection
})
export class AllocationPanel implements OnChanges {
  // Input properties to receive data from parent components
  @Input({ required: true }) allocation: ReadonlyArray<HoldingsSlice> = [];           // Portfolio allocation data
  @Input({ required: true }) liquidityWindows: ReadonlyArray<LiquidityWindow> = [];   // Liquidity window data
  @Input({ required: true }) governanceChecks: ReadonlyArray<GovernanceCheck> = [];   // Governance check data

  /**
   * Lifecycle hook called when any input properties change
   * Used here for debugging purposes to track when data updates occur
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['allocation']) {
      console.debug('[AllocationPanelComponent] allocation updated', { total: this.allocation.length });
    }
    if (changes['liquidityWindows']) {
      console.debug('[AllocationPanelComponent] liquidity windows updated', {
        windows: this.liquidityWindows.length,
      });
    }
    if (changes['governanceChecks']) {
      console.debug('[AllocationPanelComponent] governance checks updated', {
        checks: this.governanceChecks.length,
      });
    }
  }

  /**
   * TrackBy function for allocation slices to improve rendering performance
   */
  protected trackByLabel = (_: number, slice: HoldingsSlice): string => slice.label;

  /**
   * TrackBy function for liquidity windows to improve rendering performance
   */
  protected trackByWindow = (_: number, window: LiquidityWindow): string => window.asset;

  /**
   * TrackBy function for governance checks to improve rendering performance
   */
  protected trackByCheck = (_: number, check: GovernanceCheck): string => check.title;
}
