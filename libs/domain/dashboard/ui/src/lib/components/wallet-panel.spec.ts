import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WalletPanel } from './wallet-panel';

describe('WalletPanel', () => {
  let component: WalletPanel;
  let fixture: ComponentFixture<WalletPanel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WalletPanel],
    }).compileComponents();

    fixture = TestBed.createComponent(WalletPanel);
    component = fixture.componentInstance;
  });

  it('renders wallet and rewards copy', () => {
    component.wallet = {
      available: '€10',
      pending: '€2',
      deposits: '€5',
    } as const;

    component.rewards = {
      tier: 'Gold',
      nextMilestone: 'Upgrade soon',
      progress: 65,
      streak: '3 weeks engaged',
    } as const;

    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h2')?.textContent).toContain('Wallet snapshot');
    expect(compiled.textContent).toContain('€10');
    expect(compiled.textContent).toContain('Upgrade soon');
  });

  it('binds progress width', () => {
    component.wallet = { available: '€1', pending: '€0', deposits: '€0' } as const;
    component.rewards = { tier: 'Silver', nextMilestone: 'Soon', progress: 42, streak: 'Active' } as const;

    fixture.detectChanges();

    const progress = fixture.nativeElement.querySelector('.progress-bar') as HTMLElement | null;
    expect(progress?.style.width).toContain('42');
  });
});
