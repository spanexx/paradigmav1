/**
 * Wallet Panel Component
 * 
 * This component displays wallet and rewards information in a compact panel.
 * It shows available funds, pending settlements, recent deposits and rewards tier.
 * 
 * This is a standalone component that can be used within other components.
 */
import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RewardsSnapshot, WalletSnapshot } from '@paradigma/dashboard-data';

@Component({
  selector: 'lib-wallet-panel',
  standalone: true,  // This marks the component as standalone, meaning it doesn't require a NgModule
  imports: [CommonModule],  // Import required modules
  template: `
<section class="wallet-shell">
  <div>
    <h2 class="wallet-title">Wallet snapshot</h2>
    <dl class="wallet-stats">
      <div class="wallet-row">
        <dt class="wallet-label">Available</dt>
        <dd class="wallet-value">{{ wallet.available }}</dd>
      </div>
      <div class="wallet-row">
        <dt class="wallet-label">Pending settlements</dt>
        <dd class="wallet-copy">{{ wallet.pending }}</dd>
      </div>
      <div class="wallet-row">
        <dt class="wallet-label">Deposits (7d)</dt>
        <dd class="wallet-positive">{{ wallet.deposits }}</dd>
      </div>
    </dl>
  </div>

  <div class="rewards-card">
    <p class="rewards-tier">Rewards · {{ rewards.tier }} tier</p>
    <p class="rewards-next">{{ rewards.nextMilestone }}</p>
    <div class="progress-track">
      <div class="progress-bar" [style.width.%]="rewards.progress"></div>
    </div>
    <p class="rewards-streak">{{ rewards.streak }}</p>
  </div>
</section>

  `,  // Inline HTML template for the component
  styleUrl: './wallet-panel.scss',    // Styles for the component
  changeDetection: ChangeDetectionStrategy.OnPush,  // Optimize change detection
})
export class WalletPanel implements OnChanges {
  // Input properties to receive data from parent components
  @Input({ required: true }) wallet!: WalletSnapshot;   // Wallet snapshot data
  @Input({ required: true }) rewards!: RewardsSnapshot; // Rewards snapshot data

  /**
   * Lifecycle hook called when any input properties change
   * Used here for debugging purposes to track when data updates occur
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['wallet']) {
      console.debug('[WalletPanelComponent] wallet updated', changes['wallet'].currentValue);
    }
    if (changes['rewards']) {
      console.debug('[WalletPanelComponent] rewards updated', changes['rewards'].currentValue);
    }
  }
}
