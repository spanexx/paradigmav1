/**
 * Dashboard Feature Module
 * 
 * This file provides a function to register all providers required
 * for the dashboard feature. It's designed for use with Angular's
 * standalone API and can be used with standalone routing.
 * 
 * The function imports and registers the data module, UI module,
 * and facade service needed for the dashboard feature.
 */
import { EnvironmentProviders, importProvidersFrom, makeEnvironmentProviders } from '@angular/core';
import { DashboardDataModule } from '@paradigma/dashboard-data';
import { DashboardUiModule } from '@paradigma/dashboard-ui';
import { DashboardFacade } from './dashboard.facade';

/**
 * Function that returns environment providers for the dashboard feature
 * This function can be used in an application's bootstrap process
 * to set up all necessary dashboard dependencies.
 * 
 * @returns EnvironmentProviders containing all dashboard feature dependencies
 */
export function provideDashboardFeature(): EnvironmentProviders {
  return makeEnvironmentProviders([
    // Import and register the data and UI modules
    importProvidersFrom(DashboardDataModule, DashboardUiModule),
    // Register the facade service which provides the business logic layer
    DashboardFacade,
  ]);
}
