/**
 * Dashboard Dependency Injection Tokens
 * 
 * This file defines dependency injection tokens used throughout the
 * dashboard domain. These tokens allow for flexible injection of
 * services and make the code more testable by allowing different
 * implementations to be provided.
 */
import { InjectionToken } from '@angular/core';
import { DashboardDataSource } from './models/dashboard.models';

/**
 * Injection token for the DashboardDataSource interface.
 * This allows consumers to inject any implementation of DashboardDataSource
 * without depending on a specific concrete class.
 */
export const DASHBOARD_DATA_SOURCE = new InjectionToken<DashboardDataSource>('DashboardDataSource');
