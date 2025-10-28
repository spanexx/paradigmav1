/**
 * Dashboard UI Module
 * 
 * This module aggregates all the standalone UI components for the dashboard.
 * It imports and exports dashboard-specific UI components that can be used
 * in other modules or standalone applications.
 * 
 * The module uses the NgModule pattern to bundle related UI components
 * together, making them easier to import as a single unit.
 */
import { NgModule } from '@angular/core';
import { Hero } from './components/hero';
import { ActionsList } from './components/actions-list';
import { OpportunityCard } from './components/opportunity-card';
import { AllocationPanel } from './components/allocation-panel';
import { SignalStream } from './components/signal-stream';
import { ClubPulse } from './components/club-pulse';
import { WalletPanel } from './components/wallet-panel';

@NgModule({
  // Declare components that are used within this module
  imports: [Hero, ActionsList, OpportunityCard, AllocationPanel, SignalStream, ClubPulse, WalletPanel],
  // Export components so they can be used by other modules that import this module
  exports: [Hero, ActionsList, OpportunityCard, AllocationPanel, SignalStream, ClubPulse, WalletPanel],
})
export class DashboardUiModule {}
