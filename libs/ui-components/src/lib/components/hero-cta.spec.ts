import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroCta } from './hero-cta';

describe('HeroCta', () => {
  let component: HeroCta;
  let fixture: ComponentFixture<HeroCta>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroCta],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroCta);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
