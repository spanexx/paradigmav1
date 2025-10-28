import { TestBed } from '@angular/core/testing';
import { take } from 'rxjs/operators';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { DashboardFacade } from './dashboard.facade';
import {
  ActionCategory,
  DASHBOARD_DATA_SOURCE,
  DashboardDataSource,
  DashboardDataState,
} from '@paradigma/dashboard-data';
import { DASHBOARD_MOCK_STATE } from '@paradigma/dashboard';

describe('DashboardFacade', () => {
  let facade: DashboardFacade;
  let mockDataSource: MockDataSource;

  class MockDataSource implements DashboardDataSource {
    private readonly subject = new BehaviorSubject<DashboardDataState>(DASHBOARD_MOCK_STATE);

    state$() {
      return this.subject.asObservable();
    }

    emit(state: DashboardDataState) {
      this.subject.next(state);
    }
  }

  beforeEach(() => {
    mockDataSource = new MockDataSource();

    TestBed.configureTestingModule({
      providers: [
        DashboardFacade,
        { provide: DASHBOARD_DATA_SOURCE, useValue: mockDataSource },
      ],
    });

    facade = TestBed.inject(DashboardFacade);
  });

  it('exposes the initial view model with default filter', async () => {
    const vm = await firstValueFrom(facade.vm$.pipe(take(1)));

    expect(vm.activeFilter).toBe('All entities');
    expect(vm.filteredActions).toEqual(vm.upcomingActions);
    expect(vm.kpis.length).toBeGreaterThan(0);
  });

  it('filters actions when setFilter is called', async () => {
    const targetFilter: ActionCategory = 'Compliance';

    facade.setFilter(targetFilter);

    const vm = await firstValueFrom(
      facade.vm$.pipe(take(1))
    );

    expect(vm.activeFilter).toBe(targetFilter);
    expect(vm.filteredActions.every((action: DashboardDataState['upcomingActions'][number]) => action.category === targetFilter)).toBe(true);
    expect(vm.filteredActions.length).toBeGreaterThan(0);
  });

  it('emits filtered actions for categories without matches', async () => {
    const emptyState: DashboardDataState = {
      ...DASHBOARD_MOCK_STATE,
      upcomingActions: DASHBOARD_MOCK_STATE.upcomingActions.filter(
        (action: DashboardDataState['upcomingActions'][number]) => action.category !== 'Clubs'
      ),
    };
    mockDataSource.emit(emptyState);

    facade.setFilter('Clubs');

    const vm = await firstValueFrom(facade.vm$.pipe(take(1)));

    expect(vm.activeFilter).toBe('Clubs');
    expect(vm.filteredActions).toEqual([]);
  });
});
