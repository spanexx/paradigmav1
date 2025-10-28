import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AllocationPanel } from './allocation-panel';
import { GovernanceCheck, HoldingsSlice, LiquidityWindow } from '@paradigma/dashboard-data';

describe('AllocationPanel', () => {
  let component: AllocationPanel;
  let fixture: ComponentFixture<AllocationPanel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllocationPanel],
    }).compileComponents();

    fixture = TestBed.createComponent(AllocationPanel);
    component = fixture.componentInstance;
  });

  beforeEach(() => {
    component.allocation = [
      { label: 'Real assets', weight: 40, change: '+1.2%' },
      { label: 'Venture', weight: 20, change: '-0.5%' },
    ] as HoldingsSlice[];

    component.liquidityWindows = [
      { asset: 'Fund II', amount: '€1M', window: 'Next Tue', progress: 50 },
    ] as LiquidityWindow[];

    component.governanceChecks = [
      { title: 'Audit Trail', detail: 'Complete', owner: 'Ops', status: 'on-track' },
    ] as GovernanceCheck[];
  });

  it('renders allocation entries, liquidity windows, and governance checks', () => {
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelectorAll('li').length).toBeGreaterThanOrEqual(2);
    expect(compiled.textContent).toContain('Fund II');
    expect(compiled.textContent).toContain('Audit Trail');
  });

  it('binds liquidity progress width', () => {
    fixture.detectChanges();

    const bar = fixture.nativeElement.querySelector('.liquidity-window .progress-bar') as HTMLElement | null;
    expect(bar?.style.width).toContain('50');
  });
});
