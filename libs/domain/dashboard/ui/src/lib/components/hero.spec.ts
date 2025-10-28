import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Hero } from './hero';

describe('Hero', () => {
  let component: Hero;
  let fixture: ComponentFixture<Hero>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Hero],
    }).compileComponents();

    fixture = TestBed.createComponent(Hero);
    component = fixture.componentInstance;
  });

  it('should render hero details and pass wallets to panel', () => {
    const hero = {
      eyebrow: 'Test eyebrow',
      title: 'Test title',
      message: 'Test message',
      highlight: { label: 'Primary', value: '123', delta: '+1' },
      secondHighlight: { label: 'Secondary', value: '456', delta: '-1' },
    } as const;
    const wallet = { available: '€1', pending: '€2', deposits: '€3' } as const;
    const rewards = { tier: 'Gold', nextMilestone: 'Soon', progress: 42, streak: 'Weekly' } as const;

    component.hero = hero;
    component.wallet = wallet;
    component.rewards = rewards;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.hero-eyebrow')?.textContent).toContain('Test eyebrow');
    expect(compiled.querySelector('.hero-title')?.textContent).toContain('Test title');
    expect(compiled.querySelector('.hero-copy')?.textContent).toContain('Test message');

    const walletPanel = fixture.debugElement.nativeElement.querySelector('lib-wallet-panel');
    expect(walletPanel).toBeTruthy();
  });
});
