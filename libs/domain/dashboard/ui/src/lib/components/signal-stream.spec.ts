import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignalStream } from './signal-stream';
import { ActivityEvent } from '@paradigma/dashboard-data';

describe('SignalStream', () => {
  let component: SignalStream;
  let fixture: ComponentFixture<SignalStream>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignalStream],
    }).compileComponents();

    fixture = TestBed.createComponent(SignalStream);
    component = fixture.componentInstance;
  });

  it('renders each activity with badge styling', () => {
    component.activityStream = [
      { title: 'Item 1', detail: 'Detail', time: 'now', type: 'portfolio' },
      { title: 'Item 2', detail: 'More detail', time: 'later', type: 'support' },
    ] as ActivityEvent[];

    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const items = compiled.querySelectorAll('.signal-item');
    expect(items.length).toBe(2);
    const badge = compiled.querySelector('.badge');
    expect(badge?.className).toContain('stream-');
  });

  it('applies stream-specific classes', () => {
    component.activityStream = [
      { title: 'Compliance event', detail: 'Updated', time: '1m', type: 'compliance' },
    ] as ActivityEvent[];

    fixture.detectChanges();

    const badge = fixture.nativeElement.querySelector('.badge') as HTMLElement | null;
    expect(badge?.classList.contains('stream-compliance')).toBe(true);
  });
});
