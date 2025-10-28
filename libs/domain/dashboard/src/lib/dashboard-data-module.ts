/**
 * Dashboard Data Module
 * 
 * This module provides the data layer for the dashboard feature.
 * It sets up the DashboardDataService as a provider and configures
 * dependency injection using the DASHBOARD_DATA_SOURCE token.
 * This allows for easy swapping of data sources if needed (e.g., 
 * for testing or different environments).
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DASHBOARD_DATA_SOURCE } from './dashboard.tokens';
import { DashboardDataService } from './dashboard-data.service';

@NgModule({
  imports: [CommonModule],
  providers: [
    // Register the dashboard data service as a provider
    DashboardDataService,
    // Configure the injection token to use the dashboard data service
    {
      provide: DASHBOARD_DATA_SOURCE,
      useExisting: DashboardDataService,
    },
  ],
})
export class DashboardDataModule {}
