import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClubPulse } from './club-pulse';
import { ClubPulseItem } from '@paradigma/dashboard-data';
import { By } from '@angular/platform-browser';

describe('ClubPulse', () => {
  let component: ClubPulse;
  let fixture: ComponentFixture<ClubPulse>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClubPulse],
    }).compileComponents();

    fixture = TestBed.createComponent(ClubPulse);
    component = fixture.componentInstance;
  });

  it('renders pulse items with avatars', () => {
    component.pulse = [
      { name: 'Club Aurora', headline: 'Drafted note', action: 'Review', time: '2m', avatarColor: 'sky' },
      { name: 'Meridian', headline: 'KYC cleared', action: 'Assign', time: '5m', avatarColor: 'emerald' },
    ] as ClubPulseItem[];

    fixture.detectChanges();

    const items = fixture.debugElement.queryAll(By.css('li'));
    expect(items.length).toBe(2);
    expect(items[0].nativeElement.textContent).toContain('Club Aurora');
    expect(items[1].nativeElement.textContent).toContain('Assign');
  });

  it('applies avatar color classes', () => {
    component.pulse = [
      { name: 'Atlas', headline: 'Event', action: 'Share', time: '1h', avatarColor: 'amber' },
    ] as ClubPulseItem[];

    fixture.detectChanges();

    const avatar = fixture.debugElement.query(By.css('.avatar'));
    expect(avatar.nativeElement.classList.contains('avatar-variant-amber')).toBe(true);
  });
});
