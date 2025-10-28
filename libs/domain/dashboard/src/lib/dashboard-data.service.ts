/**
 * Dashboard Data Service
 * 
 * This service provides the data source for the dashboard.
 * It implements the DashboardDataSource interface and manages
 * the state of dashboard data using a BehaviorSubject.
 * Currently uses mock data (DASHBOARD_MOCK_STATE) but can be
 * easily extended to fetch real data from an API.
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DashboardDataSource, DashboardDataState } from './models/dashboard.models';
import { DASHBOARD_MOCK_STATE } from './dashboard.mock';

@Injectable()
export class DashboardDataService implements DashboardDataSource {
  // BehaviorSubject to hold the current dashboard state and emit updates to subscribers
  private readonly stateSubject = new BehaviorSubject<DashboardDataState>(DASHBOARD_MOCK_STATE);

  constructor() {
    console.debug('[DashboardDataService] initialised with mock state');
  }

  /**
   * Returns an Observable that emits the current dashboard state
   * and continues to emit updates when the state changes.
   */
  state$(): Observable<DashboardDataState> {
    console.debug('[DashboardDataService] state$ subscription created');
    return this.stateSubject.asObservable();
  }
}
