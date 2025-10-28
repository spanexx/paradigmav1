import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProcessFlowSection } from './process-flow-section';
import { Flow } from '../../../../models/landing';

describe('ProcessFlowSection', () => {
  let component: ProcessFlowSection;
  let fixture: ComponentFixture<ProcessFlowSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProcessFlowSection]
    }).compileComponents();

    fixture = TestBed.createComponent(ProcessFlowSection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.flows).toEqual([]);
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