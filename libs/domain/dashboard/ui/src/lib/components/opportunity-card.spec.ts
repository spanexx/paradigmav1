import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OpportunityCard } from './opportunity-card';
import { OpportunityCard as OpportunityCardModel } from '@paradigma/dashboard-data';

describe('OpportunityCard', () => {
  let component: OpportunityCard;
  let fixture: ComponentFixture<OpportunityCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OpportunityCard],
    }).compileComponents();

    fixture = TestBed.createComponent(OpportunityCard);
    component = fixture.componentInstance;
  });

  it('renders opportunity copy and badge', () => {
    component.opportunity = {
      title: 'Northwind Battery Campus',
      tag: 'Green infra',
      tagVariant: 'emerald',
      irr: '18.2% IRR',
      horizon: '4.5y horizon',
      committed: '€4.1M committed',
      image: 'https://example.com/image.jpg',
    } as OpportunityCardModel;

    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Northwind Battery Campus');
    expect(compiled.textContent).toContain('Green infra');
    expect(compiled.textContent).toContain('18.2% IRR');
  });

  it('applies badge class based on variant', () => {
    component.opportunity = {
      title: 'Asset',
      tag: 'Collectibles',
      tagVariant: 'amber',
      irr: '12%',
      horizon: '1y',
      committed: '€1M',
      image: 'https://example.com/img.jpg',
    } as OpportunityCardModel;

    fixture.detectChanges();

    const badge = fixture.nativeElement.querySelector('span');
    expect(badge?.className).toContain('amber');
  });
});
