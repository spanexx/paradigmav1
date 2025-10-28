/**
 * Dashboard Facade
 * 
 * This facade provides a business logic layer between the dashboard UI
 * and the data source. It handles filtering of action items based on
 * user selection and provides a combined view model that includes
 * both the base dashboard state and additional computed values.
 * 
 * It uses RxJS observables to manage and transform data streams.
 */
import { inject, Injectable } from '@angular/core';
import { DASHBOARD_DATA_SOURCE } from '@paradigma/dashboard-data';
import { ActionCategory } from '@paradigma/dashboard-data';
import { combineLatest, map } from 'rxjs';
import { BehaviorSubject, Observable, shareReplay } from 'rxjs';
import { DashboardDataSource, DashboardDataState } from '@paradigma/dashboard-data';

/**
 * Extended view model interface that adds filtered data and active filter
 * to the base dashboard state. This is what the UI components subscribe to.
 */
export interface DashboardViewModel extends DashboardDataState {
  readonly activeFilter: ActionCategory;
  readonly filteredActions: DashboardDataState['upcomingActions'];
}

@Injectable()
export class DashboardFacade {
  // Injection token resolved via revised API to satisfy lint rule
  private readonly dataSource: DashboardDataSource = inject(DASHBOARD_DATA_SOURCE);
  // BehaviorSubject to track the currently active filter
  private readonly filterSubject = new BehaviorSubject<ActionCategory>('All entities');
  // Observable for the base dashboard state from the data source
  private readonly state$: Observable<DashboardDataState> = this.dataSource
    .state$()
    .pipe(shareReplay({ bufferSize: 1, refCount: true }));

  // Public observable that emits the complete view model
  // This combines the base dashboard state with filtered data and active filter
  readonly vm$: Observable<DashboardViewModel> = combineLatest([
    this.state$,
    this.filterSubject.asObservable(),
  ]).pipe(
    map(([state, activeFilter]) => ({
      ...state,
      activeFilter,
      // Filter the upcoming actions based on the active filter
      filteredActions:
        activeFilter === 'All entities'
          ? state.upcomingActions
          : state.upcomingActions.filter((action) => action.category === activeFilter),
    })),
    // Cache the result to avoid unnecessary recalculations
    shareReplay({ bufferSize: 1, refCount: true })
  );

  constructor() {
    console.debug('[DashboardFacade] initialising');
  }

  /**
   * Updates the active filter, which triggers a new view model emission
   * @param filter The selected filter category
   */
  setFilter(filter: ActionCategory): void {
    console.debug('[DashboardFacade] setFilter', { filter });
    this.filterSubject.next(filter);
  }
}
