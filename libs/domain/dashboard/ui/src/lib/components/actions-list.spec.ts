import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActionsList } from './actions-list';
import { ActionCategory } from '@paradigma/dashboard-data';

describe('ActionsList', () => {
  let component: ActionsList;
  let fixture: ComponentFixture<ActionsList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActionsList],
    }).compileComponents();

    fixture = TestBed.createComponent(ActionsList);
    component = fixture.componentInstance;
    component.filters = ['All entities', 'Clubs'] as ActionCategory[];
    component.activeFilter = 'All entities';
    component.actions = [
      { title: 'Action A', meta: 'Meta', due: 'Soon', icon: 'bolt', category: 'All entities' },
    ];
    fixture.detectChanges();
  });

  it('renders filters with active state', () => {
    const buttons = fixture.debugElement.queryAll(By.css('button'));
    expect(buttons.length).toBe(2);
    expect(buttons[0].nativeElement.classList.contains('is-active')).toBe(true);
    expect(buttons[1].nativeElement.classList.contains('is-active')).toBe(false);
  });

  it('emits filterChange on click', () => {
    const spy = jest.spyOn(component.filterChange, 'emit');
    const second = fixture.debugElement.queryAll(By.css('button'))[1];
    second.triggerEventHandler('click');
    expect(spy).toHaveBeenCalledWith('Clubs');
  });
});
