import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { Flow } from '../../../../models/landing';

@Component({
  selector: 'app-process-flow',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './process-flow.html',
  styleUrl: './process-flow.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProcessFlow {
  @Input({ required: true }) flows: ReadonlyArray<Flow> = [];
  @Input() loading = false;

  protected activeStep = 0;

  get activeFlow(): Flow | undefined {
    return this.flows[this.activeStep];
  }

  setActiveStep(index: number): void {
    this.activeStep = index;
  }
}