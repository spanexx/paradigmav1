/**
 * Dashboard Shell Component
 * 
 * This is the main container component for the entire dashboard.
 * It orchestrates all the child components and manages the overall
 * dashboard state by connecting to the DashboardFacade.
 * 
 * It provides the main layout and structure of the dashboard,
 * including sections for hero content, quick actions, KPIs,
 * opportunities, and activity streams.
 * 
 * This is a standalone component that can be used in any application
 * that wants to include the dashboard feature.
 */
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { DashboardFacade, DashboardViewModel } from './dashboard.facade';
import {
  Hero,
  ActionsList,
  OpportunityCard,
  AllocationPanel,
  SignalStream,
  ClubPulse,
  WalletPanel,
} from '@paradigma/dashboard-ui';
import { StatCard } from '@paradigma/ui-components';
import { trendClass, severityClass, streamClass, badgeClass } from '@paradigma/dashboard-utils';
import { ActionCategory } from '@paradigma/dashboard-data';

@Component({
  selector: 'lib-dashboard-shell',
  imports: [
    AsyncPipe,  // For async pipe in templates
    NgFor,      // For *ngFor directive
    NgIf,       // For *ngIf directive
    NgClass,    // For [ngClass] directive
    Hero,               // Hero section component
    ActionsList,        // Actions list component
    OpportunityCard,    // Opportunity card component
    AllocationPanel,    // Allocation panel component
    SignalStream,       // Signal stream component
    ClubPulse,          // Club pulse component
    WalletPanel,        // Wallet panel component
    StatCard,           // Stat card component from UI components library
  ],
  templateUrl: './dashboard-shell.html',  // HTML template for the dashboard layout
  styleUrl: './dashboard-shell.scss',    // Styles for the dashboard shell
  changeDetection: ChangeDetectionStrategy.OnPush,  // Optimize change detection
})
export class DashboardShell {
  // Inject the facade service to access dashboard data and business logic
  private readonly facade = inject(DashboardFacade);
  // Observable for the dashboard view model that provides all data to the template
  protected readonly vm$ = this.facade.vm$;
  // Make utility functions available in the template for dynamic styling
  protected readonly trendClass = trendClass;
  protected readonly severityClass = severityClass;
  protected readonly streamClass = streamClass;
  protected readonly badgeClass = badgeClass;

  constructor() {
    console.debug('[DashboardShell] initialised');
  }

  /**
   * Handler for when the user selects a different filter
   * Passes the filter selection to the facade
   */
  protected onFilterChange(filter: ActionCategory): void {
    this.facade.setFilter(filter);
  }

  /**
   * TrackBy function for KPI items to improve rendering performance
   */
  protected trackByKpi = (_: number, kpi: DashboardViewModel['kpis'][number]) => kpi.label;

  /**
   * TrackBy function for opportunity items to improve rendering performance
   */
  protected trackByOpportunity = (_: number, opportunity: DashboardViewModel['opportunities'][number]) => opportunity.title;

  /**
   * TrackBy function for alert items to improve rendering performance
   */
  protected trackByAlert = (_: number, alert: DashboardViewModel['alerts'][number]) => alert.title;

  /**
   * TrackBy function for pipeline items to improve rendering performance
   */
  protected trackByPipeline = (_: number, pipeline: DashboardViewModel['pipelines'][number]) => pipeline.name;
}
