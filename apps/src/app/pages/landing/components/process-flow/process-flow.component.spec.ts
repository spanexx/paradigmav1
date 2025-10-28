import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProcessFlow } from './process-flow';
import { Flow } from '../../../../models/landing';

describe('ProcessFlow', () => {
  let component: ProcessFlow;
  let fixture: ComponentFixture<ProcessFlow>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProcessFlow]
    }).compileComponents();

    fixture = TestBed.createComponent(ProcessFlow);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.flows).toEqual([]);
    expect(component.activeStep).toBe(0);
  });

  it('should set active step correctly', () => {
    component.setActiveStep(2);
    expect(component.activeStep).toBe(2);
  });

  it('should handle flows input correctly', () => {
    const mockFlows: ReadonlyArray<Flow> = [
      {
        title: 'Test Step',
        summary: 'Test summary',
        steps: ['Step 1', 'Step 2']
      }
    ];
    
    component.flows = mockFlows;
    expect(component.flows).toBe(mockFlows);
  });
});